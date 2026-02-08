"use client";

import { useMemo, useState } from "react";
import { useReactor } from "@reactor-team/js-sdk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { sanitizeApiKey } from "@/lib/apiKey";

interface ConnectionPanelProps {
  onLocalModeChange: (isLocal: boolean) => void;
  className?: string;
}

export function ConnectionPanel({
  onLocalModeChange,
  className,
}: ConnectionPanelProps) {
  const { status, connect, disconnect } = useReactor((state) => ({
    status: state.status,
    connect: state.connect,
    disconnect: state.disconnect,
  }));

  const [isLocalMode, setIsLocalMode] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);

  const isConnecting = status === "connecting" || status === "waiting";
  const isConnected = status === "ready";
  const apiKey = useMemo(() => sanitizeApiKey(apiKeyInput), [apiKeyInput]);

  const handleConnect = async () => {
    setError(null);
    if (isLocalMode) {
      onLocalModeChange(true);
      connect();
      return;
    }
    setIsFetching(true);
    try {
      const res = apiKey
        ? await fetch("/api/reactor-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ apiKey }),
          })
        : await fetch("/api/reactor-token");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Failed to get token");
      }
      const token = data.jwt as string;
      onLocalModeChange(false);
      // Call connect(token) without updating the provider's jwtToken prop.
      // Updating jwtToken would make ReactorProvider replace the store and run
      // cleanup disconnect() on this store mid-connect, causing
      // "No active session. Call createSession() first."
      connect(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get token");
    } finally {
      setIsFetching(false);
    }
  };

  const handleLocalChange = (local: boolean) => {
    setIsLocalMode(local);
    onLocalModeChange(local);
    setError(null);
  };

  return (
    <div className={cn("flex flex-col gap-3 p-4 bg-card rounded-lg border border-border", className)}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Local model checkbox */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isLocalMode}
            onChange={(e) => handleLocalChange(e.target.checked)}
            disabled={isConnected}
            className="rounded border-border"
          />
          <span className="text-sm text-foreground">Local model</span>
        </label>

        {/* Status / error */}
        <div className="flex items-center gap-2 flex-1">
          <div
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-colors",
              status === "disconnected" && "bg-muted-foreground",
              status === "connecting" && "bg-yellow-500 animate-pulse",
              status === "waiting" && "bg-yellow-500 animate-pulse",
              status === "ready" && "bg-green-500"
            )}
          />
          <span className="text-xs text-muted-foreground capitalize hidden sm:inline">
            {status === "ready" ? "Connected" : status}
          </span>
          {error && (
            <span className="text-xs text-destructive" title={error}>
              {error}
            </span>
          )}
        </div>

        {/* Connect / Disconnect button */}
        {status === "disconnected" ? (
          <Button
            size="default"
            variant="default"
            onClick={handleConnect}
            disabled={isFetching}
            className="min-w-[100px]"
          >
            {isFetching ? "Connecting…" : "Connect"}
          </Button>
        ) : (
          <Button
            size="default"
            variant="secondary"
            onClick={() => disconnect()}
            className="min-w-[100px]"
          >
            {isConnecting ? "Cancel" : "Disconnect"}
          </Button>
        )}
      </div>

      {!isLocalMode && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1">
            <Input
              type={showApiKey ? "text" : "password"}
              placeholder="Paste Reactor API key (optional)"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              disabled={isConnected}
              autoComplete="off"
              spellCheck={false}
            />
            <p className="text-xs text-muted-foreground mt-1">
              If left blank, the server will use the API key from <code>.env.local</code>.
            </p>
          </div>
          <Button
            size="default"
            variant="ghost"
            onClick={() => setShowApiKey((prev) => !prev)}
            disabled={isConnected}
            className="min-w-[96px]"
          >
            {showApiKey ? "Hide key" : "Show key"}
          </Button>
        </div>
      )}
    </div>
  );
}
