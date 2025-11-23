import { AppError } from "../../errors/AppError";
import { Mess } from "../mess/mess.model";
import { IBazar } from "./bazar.interface";
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

export const bazarServices = { createBazar };
