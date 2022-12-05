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
    const tags = await Tag.find({}, "name").exec();

    res.render("pages/tagList", {
      title: "Tags",
      tags: tags
    });
  } catch (err) {
    return next(err);
  }
}

export async function tagDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const [tag, games] = await Promise.all([
      Tag.findById(req.params.id).exec(),
      Game.find({ tag: req.params.id }).exec()
    ]);

    if (tag === null) {
      const err: ResponseError = new Error("Developer not found");
      err.status = 404;
      return next(err);
    }

    res.render("pages/tagDetail", {
      title: tag.name,
      tag: tag,
      games: games
    });
  } catch (err) {
    return next(err);
  }
}
