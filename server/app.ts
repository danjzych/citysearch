import express, { Application, Response, Request, NextFunction } from "express";
import {
  BadRequestError,
  ExpressError,
  NotFoundError,
} from "./expressError.js";
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
    throw new BadRequestError("address query param must be of type string");
  }
  return res.json(await City.search(address));
});

/** 404 error that catches everything */
app.use((res, req, next) => {
  throw new NotFoundError();
});

app.use(
  (err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status ?? 500;
    const message = err.message || "an error occurred, please try again";

    return res.status(status).json({
      error: { message, status },
    });
  },
);

export default app;
