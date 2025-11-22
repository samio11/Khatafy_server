import { model, Schema } from "mongoose";
import { ECategory, IBazar, IItems } from "./bazar.interface";

const itemSchema = new Schema<IItems>(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: ECategory },
  },
  { versionKey: false, timestamps: false, _id: false }
);

const bazarSchema = new Schema<IBazar>(
  {
    mess: { type: Schema.Types.ObjectId, required: true, ref: "Mess" },
    addedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [itemSchema],
    total: { type: Number, required: true },
    note: { type: String },
    proof: { type: String },
    approved: { type: Boolean, default: false },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { versionKey: false, timestamps: true }
);

export const Bazar = model<IBazar>("Bazar", bazarSchema);
