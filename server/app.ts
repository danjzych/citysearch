import express, { Application } from "express";
import { allCities } from "./server.js";
import City from "./models/city.js";
import cors from "cors";

const app: Application = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  const data = {
    message: "Ok",
    date: new Date().toLocaleDateString(),
  };
  return res.status(200).json(data);
});

app.get("/cities", async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.json(await City.getAll());
  }

  if (typeof address !== "string") {
    throw new Error("error");
  }

  return res.json(await City.search(address));
});

export default app;
