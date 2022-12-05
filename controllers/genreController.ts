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