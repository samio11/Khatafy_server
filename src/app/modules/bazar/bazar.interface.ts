import { Types } from "mongoose";

export enum ECategory {
  Meat = "Meat",
  Fish = "Fish",
  Vegetable = "Vegetable",
  Masala = "Masala",
}
export interface IItems {
  name: string;
  quantity: number;
  price: number;
  category: ECategory;
}

export interface IBazar {
  mess: Types.ObjectId;
  addedBy: Types.ObjectId;
  items: IItems;
  total: number;
  note?: string;
  proof?: string;
  approved: boolean;
  approvedBy: Types.ObjectId;
}
