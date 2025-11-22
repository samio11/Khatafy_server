import { Types } from "mongoose";

export enum ERole {
  admin = "admin",
  manager = "manager",
  member = "member",
}
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  photo?: string;
  role: ERole;
  messId?: Types.ObjectId;
  isKicked: boolean;
}
