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
exports.messController = exports.getMemberMess = exports.getManagerState = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const mess_service_1 = require("./mess.service");
const createMess = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req === null || req === void 0 ? void 0 : req.body;
    const result = yield mess_service_1.messServices.createMess(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Create Mess Done",
        data: result,
    });
}));
const getAMessData = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    const result = yield mess_service_1.messServices.getAMessData(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Getting Mess Data",
        data: result,
    });
}));
const invitedUserToMess = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { messId } = req === null || req === void 0 ? void 0 : req.params;
    const { userId } = req === null || req === void 0 ? void 0 : req.body;
    const result = yield mess_service_1.messServices.invitedUserToMess(userId, messId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "User Inviting Done",
        data: result,
    });
}));
const shiftManagerRole = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { messId } = req === null || req === void 0 ? void 0 : req.params;
    const { userId } = req === null || req === void 0 ? void 0 : req.body;
    const { id } = req === null || req === void 0 ? void 0 : req.user;
    const result = yield mess_service_1.messServices.shiftManagerRole(userId, id, messId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "User Promoted Done",
        data: result,
    });
}));
const getAllMess = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req === null || req === void 0 ? void 0 : req.query;
    const result = yield mess_service_1.messServices.getAllMess(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "User Data Retrived Done",
        data: result,
    });
}));
const updateMessData = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { messId } = req === null || req === void 0 ? void 0 : req.params;
    const payload = req === null || req === void 0 ? void 0 : req.body;
    const result = yield mess_service_1.messServices.updateMessData(messId, payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Mess Data Updated",
        data: result,
    });
}));
const deleteMessData = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { messId } = req === null || req === void 0 ? void 0 : req.params;
    const { id } = req === null || req === void 0 ? void 0 : req.user;
    const result = yield mess_service_1.messServices.deleteMessData(messId, id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Mess Data Deleted",
        data: result,
    });
}));
const removeMemberFromMess = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { messId, userId } = req === null || req === void 0 ? void 0 : req.body;
    const result = yield mess_service_1.messServices.removeMemberFromMess(messId, userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Mess User is deleted",
        data: result,
    });
}));
exports.getManagerState = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const result = yield mess_service_1.messServices.getManagerStateService(id);
    return (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Manager state fetched",
        data: result,
    });
}));
exports.getMemberMess = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    // console.log(id);
    const result = yield mess_service_1.messServices.getMemberMess(id);
    return (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Member Mess Details Getted",
        data: result,
    });
}));
exports.messController = {
    createMess,
    getAMessData,
    invitedUserToMess,
    shiftManagerRole,
    getAllMess,
    updateMessData,
    deleteMessData,
    removeMemberFromMess,
    getManagerState: exports.getManagerState,
    getMemberMess: exports.getMemberMess,
};
