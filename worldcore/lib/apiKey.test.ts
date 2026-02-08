import { describe, expect, it } from "vitest";
import { sanitizeApiKey } from "./apiKey";

describe("sanitizeApiKey", () => {
  it("returns null for empty or whitespace input", () => {
    expect(sanitizeApiKey("")).toBeNull();
    expect(sanitizeApiKey("   ")).toBeNull();
    expect(sanitizeApiKey(null)).toBeNull();
    expect(sanitizeApiKey(undefined)).toBeNull();
  });

  it("trims and returns a non-empty key", () => {
    expect(sanitizeApiKey("  key-123 ")).toBe("key-123");
  });
});
