import express from "express";
const router = express.Router();

import * as gameController from "../controllers/gameController";
import * as developerController from "../controllers/developerController";
import * as genreController from "../controllers/genreController";
import * as tagController from "../controllers/tagController";

// Game routes
router.get("/", gameController.index);
router.get("/game/create", gameController.gameNew_get);
router.get("/game/:id", gameController.gameDetail);

router.post("/game/create", gameController.gameNew_post);

// Developer routes
router.get("/developers", developerController.index);
router.get("/developer/:id", developerController.developerDetail);

// Genre routes
router.get("/genres", genreController.index);
router.get("/genre/:id", genreController.genreDetail);

// Tag routes
router.get("/tags", tagController.index);
router.get("/tag/:id", tagController.tagDetail);

export default router;
