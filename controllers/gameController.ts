import async from "async";
import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

import { Developer } from "../models/developer";
import { Game } from "../models/game";
import { Genre } from "../models/genre";
import { Tag } from "../models/tag";

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

  return { index };
})();
