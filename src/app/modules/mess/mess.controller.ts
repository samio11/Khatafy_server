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
  // console.log(id, messId, userId);
  const result = await messServices.shiftManagerRole(userId, id, messId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Promoted Done",
    data: result,
  });
});

export const messController = {
  createMess,
  getAMessData,
  invitedUserToMess,
  shiftManagerRole,
};
