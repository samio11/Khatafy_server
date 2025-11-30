import { Types } from "mongoose";
import { AppError } from "../../errors/AppError";
import { ERole } from "../user/user.interface";
import { User } from "../user/user.model";
import { IMess } from "./mess.interface";
import { Mess } from "./mess.model";
import { sendEmail } from "../../utils/sendEmail";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Bazar } from "../bazar/bazar.model";

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

const getAllMess = async (query: Record<string, string>) => {
  const messQuery = new QueryBuilder(Mess.find(), query);
  const messData = await messQuery
    .search(["name"])
    .fields()
    .paginate()
    .sort()
    .filter();
  const [data, meta] = await Promise.all([
    messData.build().populate("managers").populate("members"),
    messData.getMeta(),
  ]);
  return { data, meta };
};

const updateMessData = async (id: string, payload: Partial<IMess>) => {
  const result = await Mess.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteMessData = async (messId: string, managerId: string) => {
  const existManager = await Mess.findOne({ managers: managerId });
  if (!existManager)
    throw new AppError(401, "Manager is not belong to this mess");
  const result = await Mess.findByIdAndDelete(messId);
  return "";
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

const removeMemberFromMess = async (messId: string, userId: string) => {
  const existMess = await Mess.findById(messId);
  if (!existMess) throw new AppError(401, "Mess is not exist");
  const existUser = await User.findById(userId);
  if (!existUser) throw new AppError(401, "User is not exist");
  // $pull removes matching element from an array
  const updatedMess = await Mess.findByIdAndUpdate(
    messId,
    { $pull: { members: userId } },
    { new: true }
  );

  return updatedMess;
};

const getManagerStateService = async (managerId: string) => {
  // find all messes this manager manages
  const messes = await Mess.find({ managers: managerId });

  if (!messes || messes.length === 0) {
    return null;
  }

  const result = [];

  for (const mess of messes) {
    // find all bazars for this mess
    const bazars = await Bazar.find({ mess: mess._id });

    let totalBazarCost = 0;
    bazars.forEach((b) => {
      b.items.forEach((i) => {
        totalBazarCost += i.quantity * i.price;
      });
    });

    result.push({
      messId: mess._id,
      messName: mess.name,
      monthlyBudget: mess.monthlyBudget,
      totalBazarCost,
    });
  }

  return result;
};

export const messServices = {
  createMess,
  getAMessData,
  invitedUserToMess,
  shiftManagerRole,
  getAllMess,
  updateMessData,
  deleteMessData,
  removeMemberFromMess,
  getManagerStateService,
};
