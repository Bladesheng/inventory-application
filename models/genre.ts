import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const GenreSchema = new Schema({
  name: { type: String, required: true }
});

GenreSchema.virtual("url").get(function () {
  return `/games/genre/${this._id}`;
});
