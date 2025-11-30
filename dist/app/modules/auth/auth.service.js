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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const AppError_1 = require("../../errors/AppError");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const userToken_1 = require("../../utils/userToken");
const bazar_model_1 = require("../bazar/bazar.model");
const user_interface_1 = require("../user/user.interface");
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield user_model_1.User.findOne({ email: payload.email });
    if (!existUser)
        throw new AppError_1.AppError(401, "User is not found");
    const passwordMatch = yield bcrypt_1.default.compare(payload.password, existUser.password);
    if (!passwordMatch)
        throw new AppError_1.AppError(401, "Password is not Matched");
    const token = yield (0, userToken_1.createUserToken)(existUser);
    return existUser;
});
const userRegister = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield user_model_1.User.findOne({ email: payload.email });
    if (existUser)
        throw new AppError_1.AppError(401, "User Is Already Exists");
    const result = yield user_model_1.User.create(payload);
    return result;
});
const kickUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(userId, { isKicked: true }, { new: true });
    return result;
});
const unKickUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(userId, { isKicked: false }, { new: true });
    return result;
});
const changeStatusToManager = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield user_model_1.User.findById(userId);
    if (!existUser)
        throw new AppError_1.AppError(401, "User is not Exists");
    if (existUser.role !== user_interface_1.ERole.member)
        throw new AppError_1.AppError(401, "This User is not Member");
    if (existUser.isKicked === true)
        throw new AppError_1.AppError(401, "User is kicked");
    const result = yield user_model_1.User.findByIdAndUpdate(userId, { role: user_interface_1.ERole.manager }, { new: true });
    return result;
});
const getAllUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.QueryBuilder(user_model_1.User.find(), query);
    const userData = yield userQuery
        .filter()
        .search(["email", "name", "role"])
        .sort()
        .paginate()
        .fields();
    const [data, meta] = yield Promise.all([
        userData.build(),
        userData.getMeta(),
    ]);
    return { data, meta };
});
const getAUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(userId);
    return result;
});
const getAdminState = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalUserP = user_model_1.User.countDocuments();
    const totalBazarP = bazar_model_1.Bazar.countDocuments();
    const totalMessP = bazar_model_1.Bazar.countDocuments();
    const [totalUser, totalBazar, totalMess] = yield Promise.all([
        totalUserP,
        totalBazarP,
        totalMessP,
    ]);
    return {
        totalUser,
        totalBazar,
        totalMess,
    };
});
const adminUserState = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.aggregate([
        {
            $group: {
                _id: "$role",
                count: { $sum: 1 },
            },
        },
    ]);
    return result;
});
const changeUserData = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userId, payload);
    const existUser = yield user_model_1.User.findById(userId);
    if (!existUser)
        throw new AppError_1.AppError(401, "User is not Exists");
    const result = yield user_model_1.User.findByIdAndUpdate(userId, payload, { new: true });
    return result;
});
exports.authServices = {
    userLogin,
    userRegister,
    kickUser,
    unKickUser,
    changeStatusToManager,
    getAllUser,
    getAUser,
    getAdminState,
    adminUserState,
    changeUserData,
};
