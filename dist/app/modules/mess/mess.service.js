"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messServices = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = require("../../errors/AppError");
const user_interface_1 = require("../user/user.interface");
const user_model_1 = require("../user/user.model");
const mess_model_1 = require("./mess.model");
const sendEmail_1 = require("../../utils/sendEmail");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const bazar_model_1 = require("../bazar/bazar.model");
const createMess = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mess_model_1.Mess.create(payload);
    return result;
});
const getAMessData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existMess = yield mess_model_1.Mess.findById(id);
    if (!existMess)
        throw new AppError_1.AppError(401, "Wrong Mess Id");
    const result = yield mess_model_1.Mess.findById(id)
        .populate("managers")
        .populate("members");
    return result;
});
const getAllMess = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const messQuery = new QueryBuilder_1.QueryBuilder(mess_model_1.Mess.find(), query);
    const messData = yield messQuery
        .search(["name"])
        .fields()
        .paginate()
        .sort()
        .filter();
    const [data, meta] = yield Promise.all([
        messData.build().populate("managers").populate("members"),
        messData.getMeta(),
    ]);
    return { data, meta };
});
const updateMessData = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mess_model_1.Mess.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteMessData = (messId, managerId) => __awaiter(void 0, void 0, void 0, function* () {
    const existManager = yield mess_model_1.Mess.findOne({ managers: managerId });
    if (!existManager)
        throw new AppError_1.AppError(401, "Manager is not belong to this mess");
    const result = yield mess_model_1.Mess.findByIdAndDelete(messId);
    return "";
});
const invitedUserToMess = (userId, messId) => __awaiter(void 0, void 0, void 0, function* () {
    const existMess = yield mess_model_1.Mess.findById(messId);
    if (!existMess)
        throw new AppError_1.AppError(401, "Wrong Mess Id");
    const existUser = yield user_model_1.User.findById(userId);
    if (!existUser)
        throw new AppError_1.AppError(401, "Invalid User");
    if (existUser.role !== user_interface_1.ERole.member)
        throw new AppError_1.AppError(401, "Invalid User to Join");
    if (existMess.members.some((x) => x.toString() === userId))
        throw new AppError_1.AppError(401, "User is already in mess");
    existMess.members.push(new mongoose_1.Types.ObjectId(userId));
    yield existMess.save();
    yield (0, sendEmail_1.sendEmail)({
        to: existUser.email,
        subject: "Welcome to Khatafy Mess",
        tempName: "welcomeMess",
        tempData: {
            name: existUser.name,
            messName: existMess.name,
            year: new Date().getFullYear(),
        },
    });
    return existMess;
});
const shiftManagerRole = (userId, managerId, messId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mess_model_1.Mess.startSession();
    session.startTransaction();
    try {
        const existUser = yield user_model_1.User.findById(userId);
        if (!existUser)
            throw new AppError_1.AppError(401, "User does not exist");
        const existMess = yield mess_model_1.Mess.findById(messId);
        if (!existMess)
            throw new AppError_1.AppError(401, "Wrong Mess Id");
        if (existMess.managers.toString() !== managerId)
            throw new AppError_1.AppError(401, "This manager does not belong to this mess");
        const isMember = existMess.members.some((x) => x.toString() === userId);
        if (!isMember)
            throw new AppError_1.AppError(401, "The user is not a member of the mess");
        // Update mess manager
        existMess.managers = new mongoose_1.Types.ObjectId(userId);
        yield existMess.save({ session });
        // Update roles
        yield user_model_1.User.findByIdAndUpdate(userId, { role: user_interface_1.ERole.manager }, { session, new: true });
        yield user_model_1.User.findByIdAndUpdate(managerId, { role: user_interface_1.ERole.member }, { session, new: true });
        // Send email
        yield (0, sendEmail_1.sendEmail)({
            to: existUser.email,
            subject: "🎉 You Have Been Promoted to Manager – Khatafy",
            tempName: "promotedToManager",
            tempData: {
                name: existUser.name,
                messName: existMess.name,
                year: new Date().getFullYear(),
            },
        });
        yield session.commitTransaction();
        session.endSession();
        const updatedMess = yield mess_model_1.Mess.findById(messId).populate("managers");
        return updatedMess;
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
const removeMemberFromMess = (messId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existMess = yield mess_model_1.Mess.findById(messId);
    if (!existMess)
        throw new AppError_1.AppError(401, "Mess is not exist");
    const existUser = yield user_model_1.User.findById(userId);
    if (!existUser)
        throw new AppError_1.AppError(401, "User is not exist");
    // $pull removes matching element from an array
    const updatedMess = yield mess_model_1.Mess.findByIdAndUpdate(messId, { $pull: { members: userId } }, { new: true });
    return updatedMess;
});
const getManagerStateService = (managerId) => __awaiter(void 0, void 0, void 0, function* () {
    // find all messes this manager manages
    const messes = yield mess_model_1.Mess.find({ managers: managerId });
    if (!messes || messes.length === 0) {
        return null;
    }
    const result = [];
    for (const mess of messes) {
        // find all bazars for this mess
        const bazars = yield bazar_model_1.Bazar.find({ mess: mess._id });
        let totalBazarCost = 0;
        bazars.forEach((b) => {
            b.items.forEach((i) => {
                totalBazarCost += i.quantity * i.price;
            });
        });
        result.push({
            messId: mess._id,
            messName: mess.name,
            monthlyBudget: mess.monthlyBudget,
            totalBazarCost,
        });
    }
    return result;
});
exports.messServices = {
    createMess,
    getAMessData,
    invitedUserToMess,
    shiftManagerRole,
    getAllMess,
    updateMessData,
    deleteMessData,
    removeMemberFromMess,
    getManagerStateService,
};
