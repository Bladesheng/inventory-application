import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

import newRouter, { messages } from "./routes/new";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs");

app.get("/", (req: Request, res: Response) => {
  res.render("pages/index", {
    messages: messages
  });
});

app.use("/new", newRouter);

app.use((req: Request, res: Response) => {
  res.status(404);
  res.sendFile(path.resolve("public/404.html"));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
