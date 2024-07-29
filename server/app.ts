import express, { Application } from "express";

const app: Application = express();
app.use(express.json());

app.get("/", function (req, res) {
  return res.send("hello world");
});

export default app;
