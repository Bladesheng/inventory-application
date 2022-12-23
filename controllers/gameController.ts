import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { ResponseError } from "../utils/utils";

import { Game, IGame } from "../models/game";
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

    res.render("pages/gameDetail", {
      title: game.name,
      game: game
    });
  } catch (err) {
    return next(err);
  }
}

export async function gameNew_get(req: Request, res: Response, next: NextFunction) {
  try {
    const [developers, genres, tags] = await Promise.all([
      Developer.find({}, "name").exec(),
      Genre.find({}, "name").exec(),
      Tag.find({}, "name").exec()
    ]);

    res.render("pages/gameForm", {
      title: "New game",
      developers,
      genres,
      tags
    });
  } catch (err) {
    return next(err);
  }
}

export const gameNew_post = [
  (req: Request, res: Response, next: NextFunction) => {
    // convert tags to array
    console.log("[server] Creating new game from POST request:\n", req.body);
    if (!Array.isArray(req.body.tags)) {
      req.body.tags === "undefined" ? [] : [req.body.tags];
    }
    next();
  },

  // validate and sanitize inputs
  body("name", "Name must not be empty.").trim().isLength({ min: 100 }).escape(),
  body("release_date", "Release date must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("developer", "Developer must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("genre", "Genre must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("tags.*").escape(),
  body("finished_date").trim().escape(),
  body("rating").trim().escape(),

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // extract validation errors
      const errors = validationResult(req);

      // create Game object with escaped/trimmed data and old id
      const game = new Game({
        name: req.body.name,
        release_date: req.body.release_date,
        developer: req.body.developer,
        genre: req.body.genre,
        tag: typeof req.body.tags === "undefined" ? [] : req.body.tags,
        _id: req.params.id // to prevent new id from being assigned yet
      });

      if (!errors.isEmpty()) {
        // there are errors. render again with sanitized values + errors
        // get devs, genres and tags for the form
        const [developers, genres, tags] = await Promise.all([
          Developer.find({}, "name").exec(),
          Genre.find({}, "name").exec(),
          Tag.find({}, "name").exec()
        ]);

        // mark selected tags as checked
        for (const tag of tags) {
          if (game.tag?.includes(tag._id)) {
            tag.checked = true;
          }
        }

        // TODO: fix this shit
        res.render("pages/gameForm", {
          title: "Update game",
          developers,
          genres,
          tags,
          game,
          errors: errors.array()
        });
      }

      // data from form is valid. save game
      // game.save((err) => {
      //   if (err) {
      //     return next(err);
      //   }
      //   // successfull, redirect to new game record
      //   res.redirect(game.url);
      // });
    } catch (error) {
      return next(error);
    }
  }
];
