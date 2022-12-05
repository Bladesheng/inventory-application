import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import morgan from "morgan";

import indexRouter from "./routes/index";
import collectionRouter from "./routes/collection";

dotenv.config();

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", () => {
  console.error("MongoDB connection error");
});

const app = express();

app.set("view engine", "ejs");

app.use(morgan("dev"));

app.use("/", indexRouter);
app.use("/collection", collectionRouter);

app.use((req: Request, res: Response) => {
  res.status(404);
  res.sendFile(path.resolve("public/404.html"));
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`[server] Server is running at http://localhost:${port}`);
});
