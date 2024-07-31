import { expect, describe, it } from "vitest";
import formatSearchParams from "../utils/formatSearchParams";

describe("formatSearchParams", () => {
  it("returns key val pair with lowercase trimmed string for value", () => {
    expect(formatSearchParams("    TAMpA   ")).toEqual({ address: "tampa" });
  });

  it("returns undefined for empty string", () => {
    expect(formatSearchParams("")).toBeUndefined();
  });
});
