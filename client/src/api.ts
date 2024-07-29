import { City } from "./types";

const BASE_URL = "http://localhost:3000";

export default class CitySearch {
  static async getCities(): Promise<City[]> {
    const resp = await fetch(`${BASE_URL}/cities`);

    if (!resp.ok) {
      console.error(`API ERROR: ${resp.status}`);
      const data = await resp.json();
      throw new Error(data);
    }

    return (await resp.json()) as City[];
  }
}
