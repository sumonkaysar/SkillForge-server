import { User, UserStatus } from "@prisma/client";
import { prisma } from "../config/db.config";
import AppError from "../errorHelpers/AppError";
import httpStatus from "./httpStatus";

export const checkValidUser = (user: User) => {
  if (
    user.status === UserStatus.BLOCKED ||
    user.status === UserStatus.DELETED
  ) {
    throw new AppError(httpStatus.FORBIDDEN, `User is ${user.status}`);
  }

  if (!user.isVerified) {
    throw new AppError(httpStatus.NOT_VERIFIED, "User is not verified");
  }
};

export const checkUserExist = async (
  query: { email: string } | { id: number }
) => {
  const isUserExist = await prisma.user.findUnique({ where: query });

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  checkValidUser(isUserExist);

  return isUserExist;
};
