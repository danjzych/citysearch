import { describe, expect, it, vi } from "vitest";
import CitySearch from "./api";

const mockCityData = [
  {
    id: 1,
    name: "Madison",
    lat: "43.0752983",
    lng: "-89.393898",
    state_name: "Wisconsin",
    state_abrv: "WI",
    url: "https://www.rentable.co/madison-wi",
  },
  {
    id: 2,
    name: "Milwaukee",
    lat: "43.028801",
    lng: "-87.9720001",
    state_name: "Wisconsin",
    state_abrv: "WI",
    url: "https://www.rentable.co/milwaukee-wi",
  },
  {
    id: 3,
    name: "Madison",
    lat: "0.00",
    lng: "0.00",
    state_name: "Alabama",
    state_abrv: "AL",
    url: "https://www.rentable.co/",
  },
  {
    id: 122,
    name: "Bridgeport",
    lat: "41.16",
    lng: "-73.2",
    state_name: "Connecticut",
    state_abrv: "CT",
    url: "https://www.rentable.co/bridgeport-ct",
  },
];
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
