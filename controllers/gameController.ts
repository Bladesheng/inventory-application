import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { ResponseError } from "../utils/utils";

import { Game } from "../models/game";
import "../models/developer";
import { Developer } from "../models/developer";
import "../models/genre";
import { Genre } from "../models/genre";
import "../models/tag";
import { Tag } from "../models/tag";

export async function index(req: Request, res: Response, next: NextFunction) {
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

export async function gameDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const game = await Game.findById(req.params.id)
      .populate("genre")
      .populate("developer")
      .populate("tag")
      .exec();

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
