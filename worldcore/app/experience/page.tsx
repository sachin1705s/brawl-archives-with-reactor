"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactorProvider, ReactorView, useReactor } from "@reactor-team/js-sdk";
import { Button } from "@/components/ui/button";
import { OverlayControls } from "@/components/OverlayControls";
import { sanitizeApiKey } from "@/lib/apiKey";
import { Timeline, TimelineCard, getNextCardIndex } from "@/lib/timeline";
import {
  getTimelineApiKey,
  getTimelineLocalMode,
} from "@/lib/timelineSession";

const EXPERIENCE_SECONDS = 15;
const TARGET_WIDTH = 640;
const TARGET_HEIGHT = 360;
const INITIAL_JPEG_QUALITY = 0.7;
const MAX_BASE64_BYTES = 200_000;

async function fetchTimelines(): Promise<Timeline[]> {
  const response = await fetch("/api/timeline");
  if (!response.ok) {
    throw new Error("Failed to load timeline data");
  }
  const data = (await response.json()) as { timelines: Timeline[] };
  return data.timelines ?? [];
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read image data"));
    reader.readAsDataURL(blob);
  });
}

function resizeImage(dataUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = TARGET_WIDTH;
      canvas.height = TARGET_HEIGHT;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);

      const aspectRatio = img.width / img.height;
      const targetAspect = TARGET_WIDTH / TARGET_HEIGHT;
      let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

      if (aspectRatio > targetAspect) {
        drawWidth = TARGET_WIDTH;
        drawHeight = TARGET_WIDTH / aspectRatio;
        offsetX = 0;
        offsetY = (TARGET_HEIGHT - drawHeight) / 2;
      } else {
        drawHeight = TARGET_HEIGHT;
        drawWidth = TARGET_HEIGHT * aspectRatio;
        offsetX = (TARGET_WIDTH - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, img.width, img.height, offsetX, offsetY, drawWidth, drawHeight);

      let quality = INITIAL_JPEG_QUALITY;
      let result = canvas.toDataURL("image/jpeg", quality);

      while (result.length > MAX_BASE64_BYTES && quality > 0.1) {
        quality -= 0.1;
        result = canvas.toDataURL("image/jpeg", quality);
      }

      resolve(result);
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = dataUrl;
  });
}

async function loadImageBase64(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch starting image: ${response.status}`);
  }
  const blob = await response.blob();
  const dataUrl = await blobToDataUrl(blob);
  const resized = await resizeImage(dataUrl);
  return resized.split(",")[1];
}

interface CardWithIndex extends TimelineCard {
  index: number;
  totalCount: number;
}

function ExperienceView({
  card,
  onNext,
  onBack,
}: {
  card: CardWithIndex;
  onNext: () => void;
  onBack: () => void;
}) {
  const { status, connect, sendCommand } = useReactor((state) => ({
    status: state.status,
    connect: state.connect,
    sendCommand: state.sendCommand,
  }));

  const [timeRemaining, setTimeRemaining] = useState(EXPERIENCE_SECONDS);
  const [error, setError] = useState<string | null>(null);
  const [streamState, setStreamState] = useState<"idle" | "preparing" | "ready" | "error">("idle");
  const [apiKeyInput] = useState(() => sanitizeApiKey(getTimelineApiKey() || ""));
  const [isLocalMode] = useState(() => getTimelineLocalMode());

  const timerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const fetchJwtToken = useCallback(async () => {
    const response = apiKeyInput
      ? await fetch("/api/reactor-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ apiKey: apiKeyInput }),
        })
      : await fetch("/api/reactor-token");

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error ?? "Failed to get token");
    }
    return data.jwt as string;
  }, [apiKeyInput]);

  const applyCardToModel = useCallback(async () => {
    try {
      await sendCommand("reset", {});
      const base64 = await loadImageBase64(card.startImage);
      await sendCommand("set_starting_image", { image_base64: base64 });
      await sendCommand("set_prompt", { prompt: card.prompt });
      setStreamState("ready");
    } catch (err) {
      setStreamState("error");
      setError(err instanceof Error ? err.message : "Failed to configure stream");
    }
  }, [card.prompt, card.startImage, sendCommand]);

  const clearTimers = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleNext = useCallback(() => {
    clearTimers();
    setStreamState("preparing");
    setTimeRemaining(EXPERIENCE_SECONDS);
    onNext();
  }, [onNext]);

  const startStream = useCallback(async () => {
    setError(null);
    setStreamState("preparing");

    if (isLocalMode) {
      if (status === "disconnected") {
        connect();
        return;
      }
      if (status === "ready") {
        await applyCardToModel();
      }
      return;
    }

    if (status === "ready") {
      await applyCardToModel();
      return;
    }

    const token = await fetchJwtToken();
    connect(token);
  }, [applyCardToModel, connect, fetchJwtToken, isLocalMode, status]);

  useEffect(() => {
    let cancelled = false;
    const start = async () => {
      try {
        await startStream();
      } catch (err) {
        if (!cancelled) {
          setStreamState("error");
          setError(err instanceof Error ? err.message : "Failed to connect");
        }
      }
    };

    void start();
    return () => {
      cancelled = true;
    };
  }, [startStream, card.id]);

  useEffect(() => {
    if (status === "ready" && streamState === "preparing") {
      void applyCardToModel();
    }
  }, [applyCardToModel, status, streamState]);

  useEffect(() => {
    if (streamState !== "ready") return;
    setTimeRemaining(EXPERIENCE_SECONDS);
    intervalRef.current = window.setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    timerRef.current = window.setTimeout(() => {
      handleNext();
    }, EXPERIENCE_SECONDS * 1000);

    return () => {
      clearTimers();
    };
  }, [handleNext, streamState]);

  return (
    <div className="relative h-screen w-screen bg-black">
      <ReactorView className="absolute inset-0 w-full h-full object-cover" />
      <OverlayControls className="absolute inset-0" />

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/30" />

      <div className="absolute top-4 left-4">
        <Button
          size="xs"
          variant="secondary"
          onClick={onBack}
          className="h-6 px-2 text-[10px]"
        >
          Back
        </Button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[min(90vw,680px)] flex flex-col gap-3 text-center">
        <div className="rounded-2xl border border-white/15 bg-black/55 backdrop-blur-md px-6 py-4">
          <div className="text-xs uppercase tracking-[0.35em] text-white/60">
            {card.title}
          </div>
          <div className="mt-2 text-sm md:text-base text-white/85">{card.body}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md px-6 py-3 text-xs text-white/70">
          {streamState === "ready" ? `Time left: ${timeRemaining}s` : "Preparing stream..."}
        </div>
        <div className="flex items-center justify-center">
          <Button
            size="default"
            variant="secondary"
            onClick={handleNext}
            className="h-10 px-6 text-sm"
          >
            Next
          </Button>
        </div>
        {error && (
          <div className="text-xs text-red-200 bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExperiencePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const timelineId = searchParams.get("timeline") ?? "";
  const cardId = searchParams.get("card") ?? "";
  const [timeline, setTimeline] = useState<Timeline | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const data = await fetchTimelines();
        if (!cancelled) {
          const selected = data.find((item) => item.id === timelineId) ?? data[0] ?? null;
          setTimeline(selected);
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load timeline");
          setIsLoading(false);
        }
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!timeline?.cards.length) return;
    const foundIndex = timeline.cards.findIndex((item) => item.id === cardId);
    if (foundIndex >= 0) {
      setCurrentIndex(foundIndex);
    }
  }, [cardId, timeline]);

  const card = useMemo(() => {
    if (!timeline?.cards.length) return null;
    const safeIndex = Math.min(currentIndex, timeline.cards.length - 1);
    return {
      ...timeline.cards[safeIndex],
      index: safeIndex,
      totalCount: timeline.cards.length,
    } as CardWithIndex;
  }, [currentIndex, timeline]);

  const handleNext = useCallback(() => {
    if (!timeline?.cards.length) return;
    const nextIndex = getNextCardIndex(currentIndex, timeline.cards.length);
    setCurrentIndex(nextIndex);
    router.replace(`/experience?timeline=${timeline.id}&card=${timeline.cards[nextIndex].id}`);
  }, [currentIndex, router, timeline]);

  const handleBack = useCallback(() => {
    router.push("/");
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-sm text-muted-foreground">
        Loading experience...
      </div>
    );
  }

  if (!card || error) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-sm text-muted-foreground">
        {error ?? "Card not found"}
      </div>
    );
  }

  return (
    <ReactorProvider
      modelName="worldcore"
      jwtToken={undefined}
      local={getTimelineLocalMode()}
      autoConnect={false}
    >
      <ExperienceView card={card} onNext={handleNext} onBack={handleBack} />
    </ReactorProvider>
  );
}
