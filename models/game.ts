import { Schema, Types, model } from "mongoose";

export interface IGame {
  name: string;
  release_date: Date;
  finished_date?: Date;
  rating?: number;
  developer: Types.ObjectId;
  genre: Types.ObjectId;
  tag?: [Types.ObjectId];
}

const GameSchema = new Schema<IGame>({
  name: { type: String, required: true },
  release_date: { type: Date, required: true },
  finished_date: { type: Date, default: Date.now },
  rating: { type: Number, min: 0, max: 5 },
  developer: { type: Schema.Types.ObjectId, ref: "Developer", required: true },
  genre: { type: Schema.Types.ObjectId, ref: "Genre", required: true },
  tag: [{ type: Schema.Types.ObjectId, ref: "Tag" }]
});

GameSchema.virtual("url").get(function () {
  return `/games/game/${this._id}`;
});

export const Game = model<IGame>("Game", GameSchema);
