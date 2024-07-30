import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import app from "./app";

describe("app", () => {
  it("GET / responds with status code 200", async () => {
    const resp = await request(app).get("/");
    expect(resp.statusCode).toEqual(200);
  });

  it("returns 404 catchall when no route matched", async () => {
    const resp = await request(app).get("/notanendpoint");
    expect(resp.statusCode).toEqual(404);
  });

  describe("GET /cities", () => {
    it("processes query string correctly and returns address data", async () => {
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
      ];
      const mockResponseData = {
        ok: true,
        statusText: "Ok",
        json: async () => mockCityData,
      } as unknown as Response;
      globalThis.fetch = vi.fn().mockResolvedValue(mockResponseData);

      const resp = await request(app)
        .get("/cities")
        .query({ address: "milwaukee" });
      expect(resp.body).toEqual([mockCityData[1]]);
    });
  });
});
