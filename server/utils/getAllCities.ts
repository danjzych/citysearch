import { City } from "../types.js";

const getAllCities = async (): Promise<City[]> => {
  const resp = await fetch("https://engineering.rentable.co/us_cities.json");

  if (!resp.ok) {
    console.error(`ERROR FETCHING CITIES: ${resp.status}`);
    throw new Error("Unable to get cities from engineering.rentable.co");
  }

  return await resp.json();
};

export default getAllCities;
