import express, { Application } from "express";
import { allCities } from "./server.js";
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

app.get("/cities", (req, res) => {
  const { city, state } = req.query;

  return res.json(allCities);
});

export default app;
