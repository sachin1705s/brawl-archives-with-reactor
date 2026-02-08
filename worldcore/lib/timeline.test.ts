import { describe, expect, it } from "vitest";
import { getNextCardIndex } from "./timeline";

describe("getNextCardIndex", () => {
  it("wraps around to zero", () => {
    expect(getNextCardIndex(0, 3)).toBe(1);
    expect(getNextCardIndex(1, 3)).toBe(2);
    expect(getNextCardIndex(2, 3)).toBe(0);
  });

  it("handles empty timelines", () => {
    expect(getNextCardIndex(0, 0)).toBe(0);
  });
});
