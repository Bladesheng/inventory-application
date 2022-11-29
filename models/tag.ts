import { Schema, model } from "mongoose";

export interface ITag {
  name: string;
}

const TagSchema = new Schema<ITag>({
  name: { type: String, required: true }
});

TagSchema.virtual("url").get(function () {
  return `/games/tag/${this._id}`;
});

export const Tag = model<ITag>("Tag", TagSchema);
