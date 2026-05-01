// @ts-check
import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

import movieRoutes from "./routes/movieRoutes.js";

config();
connectDB();

const app = express();

app.use("/movies", movieRoutes);

const PORT = 5001;
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("uncaughtException", async (err) => {
  console.error("uncaughtException", err);
  await disconnectDB();
  process.exit(1);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
