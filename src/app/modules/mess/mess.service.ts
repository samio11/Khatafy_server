import { AppError } from "../../errors/AppError";
import { IMess } from "./mess.interface";
import { Mess } from "./mess.model";

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

export const messServices = { createMess, getAMessData };
