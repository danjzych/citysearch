import { describe, expect, it, vi } from "vitest";
import CitySearch from "../api";
import mockCityData from "./__mocks__/mockCityData";

const mockResponseData = {
  ok: true,
  statusText: "Ok",
  json: async () => mockCityData,
} as unknown as Response;
const mockFailedResponseData = {
  ok: false,
  json: async () => "could not find resource",
} as unknown as Response;

describe("CitySearch API", () => {
  it("it returns city data when ok is true", async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce(mockResponseData);
    const searchParams = new URLSearchParams();
    const resp = await CitySearch.getCities(searchParams);
    expect(resp).toEqual(mockCityData);
  });

  it("throws error when ok is false", async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce(mockFailedResponseData);
    const searchParams = new URLSearchParams();
    expect(
      async () => await CitySearch.getCities(searchParams)
    ).rejects.toThrowError();
  });
});
