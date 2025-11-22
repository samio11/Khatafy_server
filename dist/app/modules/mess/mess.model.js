"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mess = void 0;
const mongoose_1 = require("mongoose");
const messSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, require: true, ref: "User" }],
    managers: [{ type: mongoose_1.Schema.Types.ObjectId, require: true, ref: "User" }],
    monthlyBudget: { type: Number, required: true },
}, { timestamps: true, versionKey: false });
exports.Mess = (0, mongoose_1.model)("Mess", messSchema);
