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

const shiftManagerRole = async (
  userId: string,
  managerId: string,
  messId: string
) => {
  const session = await Mess.startSession();
  session.startTransaction();

  try {
    const existUser = await User.findById(userId);
    if (!existUser) throw new AppError(401, "User does not exist");

    const existMess = await Mess.findById(messId);
    if (!existMess) throw new AppError(401, "Wrong Mess Id");

    if (existMess.managers.toString() !== managerId)
      throw new AppError(401, "This manager does not belong to this mess");

    const isMember = existMess.members.some((x) => x.toString() === userId);
    if (!isMember)
      throw new AppError(401, "The user is not a member of the mess");

    // Update mess manager
    existMess.managers = new Types.ObjectId(userId);
    await existMess.save({ session });

    // Update roles
    await User.findByIdAndUpdate(
      userId,
      { role: ERole.manager },
      { session, new: true }
    );
    await User.findByIdAndUpdate(
      managerId,
      { role: ERole.member },
      { session, new: true }
    );

    // Send email
    await sendEmail({
      to: existUser.email,
      subject: "🎉 You Have Been Promoted to Manager – Khatafy",
      tempName: "promotedToManager",
      tempData: {
        name: existUser.name,
        messName: existMess.name,
        year: new Date().getFullYear(),
      },
    });

    await session.commitTransaction();
    session.endSession();

    const updatedMess = await Mess.findById(messId).populate("managers");
    return updatedMess;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

export const messServices = {
  createMess,
  getAMessData,
  invitedUserToMess,
  shiftManagerRole,
};
