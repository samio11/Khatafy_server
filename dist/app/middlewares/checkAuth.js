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
exports.checkAuth = void 0;
const AppError_1 = require("../errors/AppError");
const jwt_1 = require("../utils/jwt");
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/user/user.model");
const checkAuth = (role) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) || ((_b = req === null || req === void 0 ? void 0 : req.cookies) === null || _b === void 0 ? void 0 : _b.accessToken);
        if (!token)
            throw new AppError_1.AppError(401, "Token not found");
        const verifiedUser = (yield (0, jwt_1.verifyToken)(token, config_1.default.JWT_ACCESS_TOKEN));
        const existUser = yield user_model_1.User.findOne({ email: verifiedUser.email });
        if (!existUser)
            throw new AppError_1.AppError(401, "User is not Exists");
        if (existUser.isKicked === true)
            throw new AppError_1.AppError(401, "User is Kicked");
        if (!role.includes(existUser.role))
            throw new AppError_1.AppError(401, "Access Denied");
        req.user = verifiedUser;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.checkAuth = checkAuth;
