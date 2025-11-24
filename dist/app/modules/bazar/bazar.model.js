"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bazar = void 0;
const mongoose_1 = require("mongoose");
const bazar_interface_1 = require("./bazar.interface");
const itemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: bazar_interface_1.ECategory },
}, { versionKey: false, timestamps: false, _id: false });
const bazarSchema = new mongoose_1.Schema({
    mess: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Mess" },
    addedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    items: [itemSchema],
    total: { type: Number, required: true },
    note: { type: String },
    proof: { type: String },
    approved: { type: Boolean, default: false },
    approvedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
}, { versionKey: false, timestamps: true });
exports.Bazar = (0, mongoose_1.model)("Bazar", bazarSchema);
