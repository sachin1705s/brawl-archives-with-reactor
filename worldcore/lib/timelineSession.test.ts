// @vitest-environment jsdom
import { describe, expect, it, beforeEach } from "vitest";
import {
  consumeTimelineAdvance,
  getTimelineApiKey,
  getTimelineLocalMode,
  setTimelineAdvance,
  setTimelineApiKey,
  setTimelineLocalMode,
} from "./timelineSession";

const storage = new Map<string, string>();

const mockSessionStorage = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
};

describe("timelineSession", () => {
  beforeEach(() => {
    storage.clear();
    Object.defineProperty(window, "sessionStorage", {
      value: mockSessionStorage,
      configurable: true,
    });
  });

  it("stores and consumes advance index", () => {
    expect(consumeTimelineAdvance()).toBeNull();
    setTimelineAdvance(2);
    expect(consumeTimelineAdvance()).toBe(2);
    expect(consumeTimelineAdvance()).toBeNull();
  });

  it("stores api key and local mode", () => {
    expect(getTimelineApiKey()).toBeNull();
    setTimelineApiKey("abc123");
    expect(getTimelineApiKey()).toBe("abc123");
    setTimelineApiKey(null);
    expect(getTimelineApiKey()).toBeNull();

    expect(getTimelineLocalMode()).toBe(false);
    setTimelineLocalMode(true);
    expect(getTimelineLocalMode()).toBe(true);
  });
});
