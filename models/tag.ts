import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const TagSchema = new Schema({
  name: { type: String, required: true }
});

TagSchema.virtual("url").get(function () {
  return `/games/tag/${this._id}`;
});
