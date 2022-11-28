import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const DeveloperSchema = new Schema({
  name: { type: String, required: true },
  country: { type: String },
  date_founded: { type: Date }
});

DeveloperSchema.virtual("url").get(function () {
  return `/games/developer/${this._id}`;
});
