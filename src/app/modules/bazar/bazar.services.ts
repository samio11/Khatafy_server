import { Types } from "mongoose";
import { AppError } from "../../errors/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Mess } from "../mess/mess.model";
import { IBazar, IItems } from "./bazar.interface";
import { Bazar } from "./bazar.model";

export const createBazar = async (
  payload: IBazar,
  messId: string,
  addedBy: string
) => {
  const existMess = await Mess.findById(messId);
  if (!existMess) throw new AppError(401, "Mess is not found");
  const addListToBazar = existMess?.members?.some(
    (x) => x.toString() === addedBy
  );
  if (!addListToBazar) throw new AppError(401, "User is not in Mess");
  const result = await Bazar.create(payload);
  return result;
};
const getAllBazarInfoByMess = async (messId: string) => {
  const result = await Bazar.find({ mess: messId });
  return result;
};

const getABazarInfo = async (bazarId: string) => {
  const result = await Bazar.findById(bazarId);
  return result;
};

const addItemToBazar = async (
  payload: IItems,
  userId: string,
  bazarId: string
) => {
  const isAdderValid = await Bazar.findOne({ _id: bazarId, addedBy: userId });
  if (!isAdderValid)
    throw new AppError(401, "This user is not valid Added for this bazar");
  isAdderValid.items.push(payload);
  await isAdderValid.save();
  return isAdderValid;
};
const updatedBazar = async (
  payload: IItems,
  userId: string,
  bazarId: string
) => {
  const isAdderValid = await Bazar.findOne({ _id: bazarId, addedBy: userId });
  if (!isAdderValid)
    throw new AppError(401, "This user is not valid Added for this bazar");
  const result = await Bazar.findByIdAndUpdate(bazarId, payload, { new: true });
  return result;
};

const deleteBazar = async (bazarId: string, userId: string) => {
  const isUserValid = await Bazar.findOne({ _id: bazarId, addedBy: userId });
  if (!isUserValid)
    throw new AppError(401, "This user is not valid Added for this bazar");
  const result = await Bazar.findByIdAndDelete(bazarId);
  return result;
};

const changeVerifyOfBazar = async (bazarId: string, managerId: string) => {
  const isUserValid = await Bazar.findOne({ _id: bazarId, addedBy: managerId });
  if (!isUserValid)
    throw new AppError(401, "This manager is not valid Added for this bazar");
  if (isUserValid.approved === true) {
    throw new AppError(400, "Bazar already verified");
  }
  isUserValid.approved = true;
  isUserValid.approvedBy = new Types.ObjectId(managerId);
  await isUserValid.save();
  return isUserValid;
};

export const bazarServices = {
  createBazar,
  getAllBazarInfoByMess,
  getABazarInfo,
  addItemToBazar,
  updatedBazar,
  deleteBazar,
  changeVerifyOfBazar,
};
