import app from "./app.js";

const startServer = async () => {
  app.listen(8671, function () {
    console.log(`Started on http://localhost:8671`);
  });
};

startServer();
