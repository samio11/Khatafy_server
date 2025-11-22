import { Types } from "mongoose";

export interface IMess {
  name: string;
  address: string;
  members: Types.ObjectId[];
  managers: Types.ObjectId[];
  monthlyBudget: number;
}
