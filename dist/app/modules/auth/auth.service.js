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
const userToken_1 = require("../../utils/userToken");
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
exports.authServices = { userLogin, userRegister };
