import express from "express";
const router = express.Router();

import { gameController } from "../controllers/gameController";

router.get("/", gameController.index);

export default router;
