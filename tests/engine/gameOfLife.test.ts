import { describe, it, expect } from "vitest";
import { computeNext, advance, findFinalState } from "../../src/engine/gameOfLife";

describe("Game of Life Engine", () => {
  it("computes next state for a blinker oscillator", () => {
    const blinker = [
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ];
    const next = computeNext(blinker);
    expect(next).toEqual([
      [false, false, false],
      [true, true, true],
      [false, false, false],
    ]);
  });

  it("advances board by N steps", () => {
    const blinker = [
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ];
    const afterTwo = advance(blinker, 2);
    expect(afterTwo).toEqual(blinker); // blinker oscillates
  });

  it("detects extinction", () => {
    const empty = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];
    const result = findFinalState(empty, 10);
    expect(result.reason).toBe("Extinct");
  });

  it("detects stable state (block)", () => {
    const block = [
      [true, true],
      [true, true],
    ];
    const result = findFinalState(block, 10);
    expect(result.reason).toBe("Stable");
  });
});