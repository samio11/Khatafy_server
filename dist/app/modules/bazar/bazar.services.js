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
exports.bazarServices = exports.createBazar = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = require("../../errors/AppError");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const mess_model_1 = require("../mess/mess.model");
const bazar_model_1 = require("./bazar.model");
const createBazar = (payload, messId, addedBy) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const existMess = yield mess_model_1.Mess.findById(messId);
    if (!existMess)
        throw new AppError_1.AppError(401, "Mess is not found");
    const addListToBazar = (_a = existMess === null || existMess === void 0 ? void 0 : existMess.members) === null || _a === void 0 ? void 0 : _a.some((x) => x.toString() === addedBy);
    if (!addListToBazar)
        throw new AppError_1.AppError(401, "User is not in Mess");
    const result = yield bazar_model_1.Bazar.create(payload);
    return result;
});
exports.createBazar = createBazar;
const getAllBazarInfoByMess = (messId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bazar_model_1.Bazar.find({ mess: messId });
    return result;
});
const getABazarInfo = (bazarId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bazar_model_1.Bazar.findById(bazarId);
    return result;
});
const getAllBazar = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const bazarQuery = new QueryBuilder_1.QueryBuilder(bazar_model_1.Bazar.find(), query);
    const bazarData = bazarQuery
        .filter()
        .search(["note"])
        .sort()
        .paginate()
        .fields();
    const [data, meta] = yield Promise.all([
        bazarData.build().populate("mess").populate("approvedBy"),
        bazarData.getMeta(),
    ]);
    return { data, meta };
});
const addItemToBazar = (payload, userId, bazarId) => __awaiter(void 0, void 0, void 0, function* () {
    const isAdderValid = yield bazar_model_1.Bazar.findOne({ _id: bazarId, addedBy: userId });
    if (!isAdderValid)
        throw new AppError_1.AppError(401, "This user is not valid Added for this bazar");
    isAdderValid.items.push(payload);
    yield isAdderValid.save();
    return isAdderValid;
});
const updatedBazar = (payload, userId, bazarId) => __awaiter(void 0, void 0, void 0, function* () {
    const isAdderValid = yield bazar_model_1.Bazar.findOne({ _id: bazarId, addedBy: userId });
    if (!isAdderValid)
        throw new AppError_1.AppError(401, "This user is not valid Added for this bazar");
    const result = yield bazar_model_1.Bazar.findByIdAndUpdate(bazarId, payload, { new: true });
    return result;
});
const deleteBazar = (bazarId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserValid = yield bazar_model_1.Bazar.findOne({ _id: bazarId, addedBy: userId });
    if (!isUserValid)
        throw new AppError_1.AppError(401, "This user is not valid Added for this bazar");
    const result = yield bazar_model_1.Bazar.findByIdAndDelete(bazarId);
    return result;
});
const changeVerifyOfBazar = (bazarId, managerId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserValid = yield bazar_model_1.Bazar.findById(bazarId);
    if (!isUserValid)
        throw new AppError_1.AppError(401, "This Bazar is not valid");
    if (isUserValid.approved === true) {
        throw new AppError_1.AppError(400, "Bazar already verified");
    }
    isUserValid.approved = true;
    isUserValid.approvedBy = new mongoose_1.Types.ObjectId(managerId);
    yield isUserValid.save();
    return isUserValid;
});
const getBazarsByManager = (managerId) => __awaiter(void 0, void 0, void 0, function* () {
    const messList = yield mess_model_1.Mess.find({ managers: managerId });
    if (messList.length === 0) {
        throw new AppError_1.AppError(401, "No mess found for this manager");
    }
    const messIds = messList.map((m) => m._id);
    const bazars = yield bazar_model_1.Bazar.find({ mess: { $in: messIds } })
        .sort({
        createdAt: -1,
    })
        .populate("addedBy")
        .populate("mess");
    return {
        bazars,
    };
});
const getAllBazarForMember = (query, memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const messQuery = new QueryBuilder_1.QueryBuilder(bazar_model_1.Bazar.find({ addedBy: memberId }), query);
    const messData = yield messQuery
        .search(["note"])
        .fields()
        .paginate()
        .sort()
        .filter();
    const [data, meta] = yield Promise.all([
        messData.build().populate("mess"),
        messData.getMeta(),
    ]);
    return { data, meta };
});
exports.bazarServices = {
    createBazar: exports.createBazar,
    getAllBazarInfoByMess,
    getABazarInfo,
    addItemToBazar,
    updatedBazar,
    deleteBazar,
    changeVerifyOfBazar,
    getAllBazar,
    getBazarsByManager,
    getAllBazarForMember,
};
