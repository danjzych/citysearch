import { describe, it, expect, vi, afterAll } from "vitest";
import { Response } from "express";
import City from "./city";

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
} as unknown as Response;

describe("City", () => {
  afterAll(() => {
    vi.resetAllMocks();
  });

  describe("getAll", () => {
    it("call correct endpoint to fetch cities", async () => {
      globalThis.fetch = vi.fn().mockResolvedValue(mockResponseData);
      const fetchSpy = vi.spyOn(globalThis, "fetch");

      await City.getAll();
      expect(fetchSpy).toHaveBeenCalledWith(
        "https://engineering.rentable.co/us_cities.json",
      );
    });

    it("returns list of cities from API", async () => {
      globalThis.fetch = vi.fn().mockResolvedValue(mockResponseData);

      const resp = await City.getAll();
      expect(resp).toEqual(mockCityData);
    });

    it("throws error if resp.ok is false", async () => {
      globalThis.fetch = vi.fn().mockResolvedValueOnce(mockFailedResponseData);

      await expect(async () => await City.getAll()).rejects.toThrowError(
        "Unable to get cities from engineering.rentable.co",
      );
    });
  });

  describe("search", () => {
    it("returns list of filtered cities based on input address", async () => {
      globalThis.fetch = vi.fn().mockResolvedValue(mockResponseData);

      const resp = await City.search("madison, wi");
      expect(resp).toEqual([mockCityData[0]]);
    });
  });

  describe("addressMatch", () => {
    it("matches on city and state when string is not delimited with comma", () => {
      expect(City.addressMatch("mad", mockCityData[0])).toBeTruthy();
      expect(City.addressMatch("wisc", mockCityData[0])).toBeTruthy();
    });

    it("matches on city and state when string is delimited with comma", () => {
      expect(City.addressMatch("madison, wisc", mockCityData[0])).toBeTruthy();

      expect(City.addressMatch("madison, wisc", mockCityData[1])).toBeFalsy();
      expect(City.addressMatch("madison, wisc", mockCityData[2])).toBeFalsy();
    });

    it("matches on state abreviation as well as full string", () => {
      expect(City.addressMatch("ct", mockCityData[3])).toBeTruthy();
      expect(City.addressMatch("bridgeport, ct", mockCityData[3])).toBeTruthy();
    });
  });
});
