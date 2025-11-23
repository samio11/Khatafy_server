import { Types } from "mongoose";
import { AppError } from "../../errors/AppError";
import { ERole } from "../user/user.interface";
import { User } from "../user/user.model";
import { IMess } from "./mess.interface";
import { Mess } from "./mess.model";
import { sendEmail } from "../../utils/sendEmail";

const createMess = async (payload: IMess) => {
  const result = await Mess.create(payload);
  return result;
};

const getAMessData = async (id: string) => {
  const existMess = await Mess.findById(id);
  if (!existMess) throw new AppError(401, "Wrong Mess Id");
  const result = await Mess.findById(id)
    .populate("managers")
    .populate("members");
  return result;
};

const invitedUserToMess = async (userId: string, messId: string) => {
  const existMess = await Mess.findById(messId);
  if (!existMess) throw new AppError(401, "Wrong Mess Id");
  const existUser = await User.findById(userId);
  if (!existUser) throw new AppError(401, "Invalid User");
  if (existUser.role !== ERole.member)
    throw new AppError(401, "Invalid User to Join");
  if (existMess.members.some((x) => x.toString() === userId))
    throw new AppError(401, "User is already in mess");
  existMess.members.push(new Types.ObjectId(userId));
  await existMess.save();
  await sendEmail({
    to: existUser.email,
    subject: "Welcome to Khatafy Mess",
    tempName: "welcomeMess",
    tempData: {
      name: existUser.name,
      messName: existMess.name,
      year: new Date().getFullYear(),
    },
  });
  return existMess;
};

export const messServices = { createMess, getAMessData, invitedUserToMess };
