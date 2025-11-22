import jwt, { SignOptions } from "jsonwebtoken";
import { IUser } from "../modules/user/user.interface";

export const generateToken = (
  payload: Partial<IUser>,
  secret: string,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn,
  } as SignOptions);
  return token;
};

export const verifyToken = (token1: string, secret: string) => {
  const verifiedToken = jwt.verify(token1, secret);
  return verifiedToken;
};
