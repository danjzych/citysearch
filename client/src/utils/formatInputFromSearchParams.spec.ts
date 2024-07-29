import { expect, describe, it } from "vitest";
import formatInputFromSearchParams from "./formatInputFromSearchParams";

describe("formatInputFromSearchParams", () => {
  it("formats input when only city is present", () => {
    const params = new URLSearchParams();
    params.set("city", "madison");

    expect(formatInputFromSearchParams(params)).toEqual("madison");
  });

  it("formats input when only state is present", () => {
    const params = new URLSearchParams();
    params.set("state", "wi");

    expect(formatInputFromSearchParams(params)).toEqual("wi");
  });

  it("formats input when both city and state are present", () => {
    const params = new URLSearchParams();
    params.set("city", "madison");
    params.set("state", "wi");

    expect(formatInputFromSearchParams(params)).toEqual("madison, wi");
  });

  it("excludes params that are not city or state", () => {
    const params = new URLSearchParams();
    params.set("foo", "bar");

    expect(formatInputFromSearchParams(params)).toEqual("");
  });
});
