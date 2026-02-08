const STORAGE_KEY = "worldcore.timeline";

interface TimelineSessionState {
  nextIndex?: number;
  advance?: boolean;
  apiKey?: string;
  localMode?: boolean;
}

function readState(): TimelineSessionState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as TimelineSessionState;
  } catch {
    return {};
  }
}

function writeState(state: TimelineSessionState) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage write errors (private mode, quota issues, etc).
  }
}

export function setTimelineAdvance(nextIndex: number) {
  const state = readState();
  writeState({ ...state, nextIndex, advance: true });
}

export function consumeTimelineAdvance(): number | null {
  const state = readState();
  if (!state.advance || typeof state.nextIndex !== "number") {
    return null;
  }
  writeState({ ...state, advance: false });
  return state.nextIndex;
}

export function setTimelineApiKey(apiKey: string | null) {
  const state = readState();
  if (!apiKey) {
    const { apiKey: _removed, ...rest } = state;
    writeState(rest);
    return;
  }
  writeState({ ...state, apiKey });
}

export function getTimelineApiKey(): string | null {
  const state = readState();
  return state.apiKey ?? null;
}

export function setTimelineLocalMode(localMode: boolean) {
  const state = readState();
  writeState({ ...state, localMode });
}

export function getTimelineLocalMode(): boolean {
  const state = readState();
  return state.localMode ?? false;
}
