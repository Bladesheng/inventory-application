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
    const genres = await Genre.find({}, "name").exec();

    res.render("pages/genreList", {
      title: "Genres",
      genres: genres
    });
  } catch (err) {
    return next(err);
  }
}

export async function genreDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const [genre, games] = await Promise.all([
      Genre.findById(req.params.id).exec(),
      Game.find({ genre: req.params.id }).exec()
    ]);

    if (genre === null) {
      const err: ResponseError = new Error("Developer not found");
      err.status = 404;
      return next(err);
    }

    res.render("pages/genreDetail", {
      title: genre.name,
      genre: genre,
      games: games
    });
  } catch (err) {
    return next(err);
  }
}
