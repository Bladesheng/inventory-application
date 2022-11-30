import async from "async";
import { body, validationResult } from "express-validator";
import { Request, Response } from "express";

import { Developer } from "../models/developer";
import { Game } from "../models/game";
import { Genre } from "../models/genre";
import { Tag } from "../models/tag";

export const gameController = (() => {
  function index(req: Request, res: Response) {
    res.send("omg GAMECONTROLLER hi!!!");
  }

  // app.get("/", (req: Request, res: Response) => {
  //   res.render("pages/index", {
  //     messages: messages
  //   });
  // });

  return { index };
})();
