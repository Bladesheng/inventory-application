import async from "async";
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
  function index(req: Request, res: Response, next: NextFunction) {
    async.parallel(
      {
        gamesList(callback) {
          Game.find({}, "name rating").exec(callback);
        }
      },
      (err, results) => {
        if (err) {
          return next(err);
        }

        res.render("pages/index", {
          title: "Home",
          games: results.gamesList
        });
      }
    );
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
