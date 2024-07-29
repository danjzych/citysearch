import app from "./app.js";
import getAllCities from "./utils/getAllCities.js";
import { City } from "./types.js";

let allCities: City[];

const startServer = async () => {
  try {
    allCities = await getAllCities();
    console.log("Successfully loaded all cities from engineering.rentable.co");
  } catch (e) {
    console.error(e);
  }

  app.listen(3000, function () {
    console.log(`Started on http://localhost:3000`);
  });
};

startServer();
