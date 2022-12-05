import { Schema, model } from "mongoose";

export interface IDeveloper {
  name: string;
  country: string;
  date_founded: Date;
}

const DeveloperSchema = new Schema<IDeveloper>({
  name: { type: String, required: true },
  country: { type: String, required: true },
  date_founded: { type: Date, required: true }
});

DeveloperSchema.virtual("url").get(function () {
  return `/collection/developer/${this._id}`;
});

export const Developer = model<IDeveloper>("Developer", DeveloperSchema);
