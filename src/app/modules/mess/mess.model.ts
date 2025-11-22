import { model, Schema } from "mongoose";
import { IMess } from "./mess.interface";

const messSchema = new Schema<IMess>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, require: true, ref: "User" }],
    managers: [{ type: Schema.Types.ObjectId, require: true, ref: "User" }],
    monthlyBudget: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const Mess = model<IMess>("Mess", messSchema);
