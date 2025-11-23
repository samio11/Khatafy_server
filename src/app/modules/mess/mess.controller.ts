import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { messServices } from "./mess.service";

const createMess = catchAsync(async (req, res, next) => {
  const payload = req?.body;
  const result = await messServices.createMess(payload);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Create Mess Done",
    data: result,
  });
});
const getAMessData = catchAsync(async (req, res, next) => {
  const { id } = req?.params;
  const result = await messServices.getAMessData(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Getting Mess Data",
    data: result,
  });
});
const invitedUserToMess = catchAsync(async (req, res, next) => {
  const { messId } = req?.params;
  const { userId } = req?.body;
  const result = await messServices.invitedUserToMess(userId, messId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Inviting Done",
    data: result,
  });
});
const shiftManagerRole = catchAsync(async (req, res, next) => {
  const { messId } = req?.params;
  const { userId } = req?.body;
  const { id } = req?.user;
  const result = await messServices.shiftManagerRole(userId, id, messId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Promoted Done",
    data: result,
  });
});
const getAllMess = catchAsync(async (req, res, next) => {
  const query = req?.query;
  const result = await messServices.getAllMess(query as Record<string, string>);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Data Retrived Done",
    data: result,
  });
});
const updateMessData = catchAsync(async (req, res, next) => {
  const { messId } = req?.params;
  const payload = req?.body;
  const result = await messServices.updateMessData(messId, payload);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Mess Data Updated",
    data: result,
  });
});
const deleteMessData = catchAsync(async (req, res, next) => {
  const { messId } = req?.params;
  const { id } = req?.user as JwtPayload;
  const result = await messServices.deleteMessData(messId, id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Mess Data Deleted",
    data: result,
  });
});

export const messController = {
  createMess,
  getAMessData,
  invitedUserToMess,
  shiftManagerRole,
  getAllMess,
  updateMessData,
  deleteMessData,
};
