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
    const developers = await Developer.find({}, "name").exec();

    res.render("pages/developerList", {
      title: "Developers",
      developers: developers
    });
  } catch (err) {
    return next(err);
  }
}

export async function developerDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const [developer, games] = await Promise.all([
      Developer.findById(req.params.id).exec(),
      Game.find({ developer: req.params.id }).exec()
    ]);

    if (developer === null) {
      const err: ResponseError = new Error("Developer not found");
      err.status = 404;
      return next(err);
    }

    res.render("pages/developerDetail", {
      title: developer.name,
      developer: developer,
      games: games
    });
  } catch (err) {
    return next(err);
  }
}
