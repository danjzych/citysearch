import { iCity } from "../types";

export default class City {
  /**
   * Gets all cities from rentable API.
   */
  static async getAll(): Promise<iCity[]> {
    const resp = await fetch("https://engineering.rentable.co/us_cities.json");

    if (!resp.ok) {
      console.error(`ERROR FETCHING CITIES: ${resp.status}`);
      throw new Error("Unable to get cities from engineering.rentable.co");
    }

    return (await resp.json()) as iCity[];
  }

  /**
   * Takes address argument and returns array of partially matched cities.
   */
  static async search(address: string): Promise<iCity[]> {
    const allCities = await this.getAll();

    return allCities.filter((c) => this.addressMatch(address, c), this);
  }

  /**
   * Compares two addresses and returns a match on city and/or state.
   */
  static addressMatch(searched: string, comparison: iCity): boolean {
    const [searchedCity, searchedState] = searched.split(",");
    const {
      name: comparisonCity,
      state_name: comparisonState,
      state_abrv: comparisonAbrv,
    } = comparison;

    return !searchedState
      ? comparisonCity.toLowerCase().startsWith(searchedCity) ||
          comparisonState.toLowerCase().startsWith(searchedCity) ||
          comparisonAbrv.toLocaleLowerCase().startsWith(searchedCity)
      : comparisonCity.toLowerCase() === searchedCity &&
          (comparisonState.toLowerCase().startsWith(searchedState.trim()) ||
            comparisonAbrv
              .toLocaleLowerCase()
              .startsWith(searchedState.trim()));
  }
}
