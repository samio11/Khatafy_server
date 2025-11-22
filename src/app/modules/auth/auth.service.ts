import { AppError } from "../../errors/AppError";
import { createUserToken } from "../../utils/userToken";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcrypt";

const userLogin = async (payload: { email: string; password: string }) => {
  const existUser = await User.findOne({ email: payload.email });
  if (!existUser) throw new AppError(401, "User is not found");
  const passwordMatch = await bcrypt.compare(
    payload.password,
    existUser.password
  );
  if (!passwordMatch) throw new AppError(401, "Password is not Matched");
  const token = await createUserToken(existUser);
  return existUser;
};

const userRegister = async (payload: IUser) => {
  const existUser = await User.findOne({ email: payload.email });
  if (existUser) throw new AppError(401, "User Is Already Exists");
  const result = await User.create(payload);
  return result;
};

export const authServices = { userLogin, userRegister };
