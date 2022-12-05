import express from "express";
const router = express.Router();

import * as gameController from "../controllers/gameController";
import * as developerController from "../controllers/developerController";

// Game routes
router.get("/", gameController.index);

router.get("/game/:id", gameController.gameDetail);

// Developer routers
router.get("/developers", developerController.index);

export default router;
