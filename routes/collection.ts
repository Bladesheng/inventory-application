import express from "express";
const router = express.Router();

import { gameController } from "../controllers/gameController";

// collection home page
router.get("/", gameController.index);

router.get("/game/:id", gameController.gameDetail);

export default router;
