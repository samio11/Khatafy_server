import { AppError } from "../../errors/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { createUserToken } from "../../utils/userToken";
import { ERole, IUser } from "../user/user.interface";
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

const kickUser = async (userId: string) => {
  const result = await User.findByIdAndUpdate(
    userId,
    { isKicked: true },
    { new: true }
  );
  return result;
};
const unKickUser = async (userId: string) => {
  const result = await User.findByIdAndUpdate(
    userId,
    { isKicked: false },
    { new: true }
  );
  return result;
};

const changeStatusToManager = async (userId: string) => {
  const existUser = await User.findById(userId);
  if (!existUser) throw new AppError(401, "User is not Exists");
  if (existUser.role !== ERole.member)
    throw new AppError(401, "This User is not Member");
  if (existUser.isKicked === true) throw new AppError(401, "User is kicked");
  const result = await User.findByIdAndUpdate(
    userId,
    { role: ERole.manager },
    { new: true }
  );
  return result;
};

const getAllUser = async (query: Record<string, string>) => {
  const userQuery = new QueryBuilder(User.find(), query);
  const userData = await userQuery
    .filter()
    .search(["email", "name"])
    .sort()
    .paginate()
    .fields();
  const [data, meta] = await Promise.all([
    userData.build(),
    userData.getMeta(),
  ]);
  return { data, meta };
};

const getAUser = async (userId: string) => {
  const result = await User.findById(userId);
  return result;
};

export const authServices = {
  userLogin,
  userRegister,
  kickUser,
  unKickUser,
  changeStatusToManager,
  getAllUser,
  getAUser,
};
