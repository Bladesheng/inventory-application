import { Schema, model } from "mongoose";

export interface ITag {
  name: string;
  checked?: boolean;
}

const TagSchema = new Schema<ITag>({
  name: { type: String, required: true }
});

TagSchema.virtual("url").get(function () {
  return `/collection/tag/${this._id}`;
});

TagSchema.virtual("checked");

export const Tag = model<ITag>("Tag", TagSchema);
