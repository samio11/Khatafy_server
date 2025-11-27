import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { setCookie } from "../../utils/setCookie";
import { createUserToken } from "../../utils/userToken";
import { authServices } from "./auth.service";

const userLogin = catchAsync(async (req, res, next) => {
  const payload = req?.body;
  const result = await authServices.userLogin(payload);
  const token = createUserToken(result);
  setCookie(res, token);
  sendResponse(res, {
    success: true,
    message: "User Login Done!",
    statusCode: 200,
    data: token,
  });
});

const userRegister = catchAsync(async (req, res, next) => {
  const payload = {
    ...JSON.parse(req?.body?.data),
    photo: req?.file?.path,
  };
  const result = await authServices.userRegister(payload);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User register Done!!!",
    data: result,
  });
});
const kickUser = catchAsync(async (req, res, next) => {
  const { userId } = req?.params;
  const result = await authServices.kickUser(userId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User is Kicked",
    data: result,
  });
});
const unKickUser = catchAsync(async (req, res, next) => {
  const { userId } = req?.params;
  const result = await authServices.unKickUser(userId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User status changed to unKicked",
    data: result,
  });
});
const changeStatusToManager = catchAsync(async (req, res, next) => {
  const { userId } = req?.params;
  const result = await authServices.unKickUser(userId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User status changed to Manager",
    data: result,
  });
});
const getAllUser = catchAsync(async (req, res, next) => {
  const query = req?.query;
  const result = await authServices.getAllUser(query as Record<string, string>);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Get All User Data",
    data: result,
  });
});
const getAUser = catchAsync(async (req, res, next) => {
  const { id } = req?.user;
  const result = await authServices.getAUser(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Get A User Data",
    data: result,
  });
});
const getAdminState = catchAsync(async (req, res, next) => {
  const result = await authServices.getAdminState();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Admin State Done",
    data: result,
  });
});
const getAdminUserState = catchAsync(async (req, res, next) => {
  const result = await authServices.adminUserState();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Admin User State Done",
    data: result,
  });
});
const changeUserData = catchAsync(async (req, res, next) => {
  const { id } = req?.user as JwtPayload;
  const payload = req?.body;
  const result = await authServices.changeUserData(id, payload);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Data Updated",
    data: result,
  });
});

const userLogout = catchAsync(async (req, res, next) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Logout Done!!!",
    data: "",
  });
});

export const authController = {
  userLogin,
  userRegister,
  userLogout,
  kickUser,
  unKickUser,
  changeStatusToManager,
  getAUser,
  getAllUser,
  getAdminState,
  getAdminUserState,
  changeUserData,
};
