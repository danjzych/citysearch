import app from "./app.js";
import getAllCities from "./utils/getAllCities.js";
import { City } from "./types.js";

export const allCities: City[] = [];

const startServer = async () => {
  try {
    const data = await getAllCities();
    allCities.push(...data);
    console.log("Successfully loaded all cities from engineering.rentable.co");
  } catch (e) {
    console.error(e);
  }

  app.listen(3000, function () {
    console.log(`Started on http://localhost:3000`);
  });
};

startServer();
