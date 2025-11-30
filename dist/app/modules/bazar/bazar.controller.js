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
exports.bazarController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const bazar_services_1 = require("./bazar.services");
const sendResponse_1 = require("../../utils/sendResponse");
const createBazar = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { messId } = req === null || req === void 0 ? void 0 : req.params;
    const { id } = req === null || req === void 0 ? void 0 : req.user;
    const payload = Object.assign(Object.assign({}, JSON.parse((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.data)), { proof: (_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.path, mess: messId, addedBy: id });
    const result = yield bazar_services_1.bazarServices.createBazar(payload, messId, id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Bazar is created",
        data: result,
    });
}));
const getAllBazarInfoByMess = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { messId } = req === null || req === void 0 ? void 0 : req.params;
    const result = yield bazar_services_1.bazarServices.getAllBazarInfoByMess(messId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Getting All Bazar Item",
        data: result,
    });
}));
const getABazarInfo = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bazarId } = req === null || req === void 0 ? void 0 : req.params;
    const result = yield bazar_services_1.bazarServices.getABazarInfo(bazarId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Getting A Bazar Info",
        data: result,
    });
}));
const addItemToBazar = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req === null || req === void 0 ? void 0 : req.user;
    const { messId } = req === null || req === void 0 ? void 0 : req.params;
    const payload = req === null || req === void 0 ? void 0 : req.body;
    const result = yield bazar_services_1.bazarServices.addItemToBazar(payload, id, messId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "New Item added to Bazar",
        data: result,
    });
}));
const updatedBazar = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req === null || req === void 0 ? void 0 : req.user;
    const { messId } = req === null || req === void 0 ? void 0 : req.params;
    const payload = req === null || req === void 0 ? void 0 : req.body;
    const result = yield bazar_services_1.bazarServices.updatedBazar(payload, id, messId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Update Bazar item",
        data: result,
    });
}));
const deleteBazar = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { messId } = req === null || req === void 0 ? void 0 : req.params;
    const { id } = req === null || req === void 0 ? void 0 : req.user;
    const result = yield bazar_services_1.bazarServices.deleteBazar(messId, id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Delete Bazar",
        data: result,
    });
}));
const changeVerifyOfBazar = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bazarId } = req === null || req === void 0 ? void 0 : req.params;
    const { id } = req === null || req === void 0 ? void 0 : req.user;
    const result = yield bazar_services_1.bazarServices.changeVerifyOfBazar(bazarId, id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Bazar Status Changed",
        data: result,
    });
}));
const getAllBazar = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req === null || req === void 0 ? void 0 : req.query;
    const result = yield bazar_services_1.bazarServices.getAllBazar(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Bazar Data Getted",
        data: result,
    });
}));
const getBazarsByManager = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req === null || req === void 0 ? void 0 : req.user;
    const result = yield bazar_services_1.bazarServices.getAllBazar(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Bazar Data Getted",
        data: result,
    });
}));
exports.bazarController = {
    createBazar,
    getAllBazarInfoByMess,
    getABazarInfo,
    addItemToBazar,
    updatedBazar,
    deleteBazar,
    changeVerifyOfBazar,
    getAllBazar,
    getBazarsByManager,
};
