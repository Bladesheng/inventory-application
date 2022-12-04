import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

import { Developer } from "../models/developer";
import { Game } from "../models/game";
import { Genre } from "../models/genre";
import { Tag } from "../models/tag";

interface ResponseError extends Error {
  status?: number;
}

export const gameController = (() => {
  async function index(req: Request, res: Response, next: NextFunction) {
    try {
      const games = await Game.find({}, "name rating").exec();

      res.render("pages/collection", {
        title: "Home",
        games: games
      });
    } catch (err) {
      return next(err);
    }
  }

  async function gameDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const game = await Game.findById(req.params.id).exec();

      if (game === null) {
        const err: ResponseError = new Error("Book not found");
        err.status = 404;
        return next(err);
      }

      res.render("pages/gameDetails", {
        title: game.name,
        game: game
      });
    } catch (err) {
      return next(err);
    }
  }

  return { index, gameDetail };
})();
