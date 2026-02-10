"use client";

import { useSearchParams } from "next/navigation";

export default function ComingSoonPage() {
  const searchParams = useSearchParams();
  const timelineTitle = searchParams.get("title") ?? "This timeline";

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Coming soon</p>
        <h1 className="mt-4 text-3xl font-semibold">{timelineTitle}</h1>
        <p className="mt-3 text-sm text-white/70">
          This timeline is still being assembled. Check back soon.
        </p>
      </div>
    </div>
  );
}
