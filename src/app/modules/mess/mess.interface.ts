import { Types } from "mongoose";

export interface IMess {
  _id?: string;
  name: string;
  address: string;
  members: Types.ObjectId[];
  managers: Types.ObjectId[];
  monthlyBudget: number;
}
