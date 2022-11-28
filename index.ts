import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

import newRouter, { messages } from "./routes/new";

dotenv.config();

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", () => {
  console.error("MongoDB connection error");
});

const app = express();

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

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
