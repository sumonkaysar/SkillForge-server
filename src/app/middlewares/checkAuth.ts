import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import envVars from "../config/env.config";
import AppError from "../errorHelpers/AppError";
import { checkUserExist } from "../utils/checkUserValidity";
import httpStatus from "../utils/httpStatus";
import { verifyToken } from "../utils/userTokens";

const checkAuth = (...roles: UserRole[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const accessToken = req.cookies.accessToken || req.headers.authorization;

      if (!accessToken) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are unauthorized");
      }

      const decoded = verifyToken(
        accessToken,
        envVars.JWT_SECRET
      ) as JwtPayload;

      const user = await checkUserExist({ id: decoded.userId });

      if (roles.length > 0 && !roles.includes(user.role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are unauthorized");
      }

      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default checkAuth;
