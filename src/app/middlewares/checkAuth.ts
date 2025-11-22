import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { verifyToken } from "../utils/jwt";
import config from "../config";
import { User } from "../modules/user/user.model";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth =
  (role: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req?.headers?.authorization || req?.cookies?.accessToken;
      if (!token) throw new AppError(401, "Token not found");
      const verifiedUser = (await verifyToken(
        token,
        config.JWT_ACCESS_TOKEN as string
      )) as JwtPayload;
      const existUser = await User.findOne({ email: verifiedUser.email });
      if (!existUser) throw new AppError(401, "User is not Exists");
      if (existUser.isKicked === true)
        throw new AppError(401, "User is Kicked");
      if (!role.includes(existUser.role))
        throw new AppError(401, "Access Denied");
      req.user = verifiedUser;
      next();
    } catch (err) {
      next(err);
    }
  };
