import { City } from "./types";

const BASE_URL = "http://localhost:8671";

export default class CitySearch {
  static async getCities(params: URLSearchParams): Promise<City[]> {
    const url = new URL(`${BASE_URL}/cities`);
    url.search = params.toString();
    const resp = await fetch(url);

    if (!resp.ok) {
      console.error(`API ERROR: ${resp.status}`);
      const data = await resp.json();
      throw new Error(data);
    }

    return (await resp.json()) as City[];
  }
}
