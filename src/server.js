// @ts-check
import express from "express";

import movieRoutes from "./routes/movieRoutes.js";

const app = express();

app.use("/movies", movieRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
