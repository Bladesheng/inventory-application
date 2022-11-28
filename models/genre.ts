import { Schema } from "mongoose";

export interface IGenre {
  name: string;
}

export const GenreSchema = new Schema<IGenre>({
  name: { type: String, required: true }
});

GenreSchema.virtual("url").get(function () {
  return `/games/genre/${this._id}`;
});
