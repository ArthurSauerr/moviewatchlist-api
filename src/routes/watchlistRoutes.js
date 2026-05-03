import express from "express";
import { register, login, logout } from "../controller/authController.js";

const router = express.Router();

router.post("/", addToWatchlist);

export default router;
