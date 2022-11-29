import { Schema, model } from "mongoose";

export interface IGenre {
  name: string;
}

const GenreSchema = new Schema<IGenre>({
  name: { type: String, required: true }
});

export const Genre = model<IGenre>("Genre", GenreSchema);

GenreSchema.virtual("url").get(function () {
  return `/games/genre/${this._id}`;
});
