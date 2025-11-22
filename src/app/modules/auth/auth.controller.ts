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

export const authController = { userLogin, userRegister, userLogout };
