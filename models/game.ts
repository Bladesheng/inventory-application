import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const GameSchema = new Schema({
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
