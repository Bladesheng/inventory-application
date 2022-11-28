import { Schema } from "mongoose";

export interface ITag {
  name: string;
}

export const TagSchema = new Schema<ITag>({
  name: { type: String, required: true }
});

TagSchema.virtual("url").get(function () {
  return `/games/tag/${this._id}`;
});
