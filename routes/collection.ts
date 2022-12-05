import express from "express";
const router = express.Router();

import * as gameController from "../controllers/gameController";
import * as developerController from "../controllers/developerController";
import * as genreController from "../controllers/genreController";
import * as tagController from "../controllers/tagController";

// Game routes
router.get("/", gameController.index);
router.get("/game/:id", gameController.gameDetail);

// Developer routes
router.get("/developers", developerController.index);
router.get("/developer/:id", developerController.developerDetail);

// Genre routes
router.get("/genres", genreController.index);
router.get("/genre/:id", genreController.genreDetail);

// Tag routes
router.get("/tags", tagController.index);

export default router;
