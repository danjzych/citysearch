import app from "./app.js";

const startServer = async () => {
  app.listen(3000, function () {
    console.log(`Started on http://localhost:3000`);
  });
};

startServer();
