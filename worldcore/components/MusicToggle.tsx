"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const AUDIO_SRC = "/audio/brawl-archives-theme.mp3";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.35;
    audio.muted = false;
    audioRef.current = audio;

    const handleCanPlay = () => setCanPlay(true);
    const handleEnded = () => {
      audio.currentTime = 0;
      void audio.play();
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("ended", handleEnded);

    // Attempt autoplay; will be blocked until user interaction in some browsers.
    void audio.play().catch(() => {
      // Autoplay blocked; user must tap icon once to start.
    });

    return () => {
      audio.pause();
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = isMuted;
    if (!isMuted && canPlay) {
      void audioRef.current.play().catch(() => {
        // Ignore play errors (autoplay restrictions).
      });
    }
  }, [canPlay, isMuted]);

  const label = useMemo(() => (isMuted ? "Music off" : "Music on"), [isMuted]);

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => setIsMuted((prev) => !prev)}
      className="fixed top-4 right-4 z-50 h-9 w-9 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white/80 hover:text-white hover:border-white/50 transition"
    >
      {isMuted ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4 mx-auto" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16.5 12a4.5 4.5 0 0 0-3-4.24v8.48A4.5 4.5 0 0 0 16.5 12M3 9v6h4l5 5V4L7 9H3m14.59 3l2.83 2.83-1.42 1.42L16.17 13l-2.83 2.83-1.42-1.42L14.75 12l-2.83-2.83 1.42-1.42L16.17 11l2.83-2.83 1.42 1.42L17.59 12Z"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4 mx-auto" aria-hidden="true">
          <path
            fill="currentColor"
            d="M14 3.23v17.54c0 .9-1.08 1.34-1.71.71L7.59 17H4c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2h3.59l4.7-4.48c.63-.63 1.71-.19 1.71.71M16.5 12c0-1.77-.77-3.29-2-4.31v8.62c1.23-1.02 2-2.54 2-4.31M14.5 5.97l1.5-1.5C18.93 6.4 20 9.05 20 12s-1.07 5.6-4 7.53l-1.5-1.5C16.72 16.2 17.5 14.2 17.5 12s-.78-4.2-3-6.03Z"
          />
        </svg>
      )}
    </button>
  );
}
