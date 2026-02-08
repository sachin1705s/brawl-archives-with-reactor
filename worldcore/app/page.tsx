"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { sanitizeApiKey } from "@/lib/apiKey";
import { Timeline } from "@/lib/timeline";
import {
  consumeTimelineAdvance,
  getTimelineApiKey,
  getTimelineLocalMode,
  setTimelineApiKey,
  setTimelineLocalMode,
} from "@/lib/timelineSession";


async function fetchTimelines(): Promise<Timeline[]> {
  const response = await fetch("/api/timeline");
  if (!response.ok) {
    throw new Error("Failed to load timeline data");
  }
  const data = (await response.json()) as { timelines: Timeline[] };
  return data.timelines ?? [];
}

export default function Page() {
  const router = useRouter();
  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [phase, setPhase] = useState<"loading" | "ready">("loading");
  const [apiKeyInput, setApiKeyInput] = useState(() => getTimelineApiKey() ?? "");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLocalMode, setIsLocalMode] = useState(() => getTimelineLocalMode());
  const [error, setError] = useState<string | null>(null);

  const apiKey = useMemo(() => sanitizeApiKey(apiKeyInput), [apiKeyInput]);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const data = await fetchTimelines();
        if (!cancelled) {
          setTimelines(data);
          setPhase(data.length > 0 ? "ready" : "loading");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load timeline");
        }
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    consumeTimelineAdvance();
  }, []);

  useEffect(() => {
    setTimelineApiKey(apiKey);
  }, [apiKey]);

  useEffect(() => {
    setTimelineLocalMode(isLocalMode);
  }, [isLocalMode]);

  const handleEnter = (timeline: Timeline) => {
    if (!timeline.cards.length) return;
    router.push(`/experience?timeline=${timeline.id}&card=${timeline.cards[0].id}`);
  };

  if (phase === "loading" && timelines.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
        Loading timeline...
      </div>
    );
  }

  if (timelines.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
        No timeline cards configured.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-black text-white min-h-screen">
        <div className="px-4 md:px-10 pt-10 pb-6 flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-semibold text-white/90 tracking-wide">
              Brawl Archives
            </h1>
            <p className="mt-2 text-sm md:text-base text-white/60">
              Choose a timeline to explore
            </p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-2 max-w-4xl mx-auto w-full">
            <div className="flex-1">
              <Input
                type={showApiKey ? "text" : "password"}
                placeholder="Paste Reactor API key to start this timeline"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                spellCheck={false}
                autoComplete="off"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowApiKey((prev) => !prev)}
              className="self-start text-white/70 hover:text-white"
            >
              {showApiKey ? "Hide key" : "Show key"}
            </Button>
          </div>
        </div>

        <div className="px-4 md:px-10 pb-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto w-full">
            {timelines.map((timeline) => (
              <button
                key={timeline.id}
                type="button"
                onClick={() => handleEnter(timeline)}
                className="group text-left rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm transition-transform hover:-translate-y-1 hover:border-white/30"
              >
                <div className="relative h-44">
                  <img
                    src={timeline.coverImage}
                    alt={timeline.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="px-4 py-4">
                  <h3 className="text-base font-semibold text-white">{timeline.title}</h3>
                  <p className="text-xs text-white/60 mt-1">{timeline.roomsLabel}</p>
                </div>
              </button>
            ))}
          </div>

          {error && (
            <div className="text-xs text-red-200 bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-md text-center max-w-md mx-auto mt-8">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
