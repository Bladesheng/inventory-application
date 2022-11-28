import { Schema } from "mongoose";

export interface IDeveloper {
  name: string;
  country: string;
  date_founded: Date;
}

export const DeveloperSchema = new Schema<IDeveloper>({
  name: { type: String, required: true },
  country: { type: String, required: true },
  date_founded: { type: Date, required: true }
});

DeveloperSchema.virtual("url").get(function () {
  return `/games/developer/${this._id}`;
});
