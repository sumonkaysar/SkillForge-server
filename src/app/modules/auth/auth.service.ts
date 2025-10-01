import { User } from ".prisma/client";
import { compare } from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../config/db.config";
import AppError from "../../errorHelpers/AppError";
import { checkValidUser } from "../../utils/checkUserValidity";
import httpStatus from "../../utils/httpStatus";
import { createUserTokens } from "../../utils/userTokens";

const credentialsLogin = async (payload: User) => {
  const isUserExist = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Wrong credentials");
  }

  const isPasswordMatched = await compare(
    payload.password as string,
    isUserExist.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, "Wrong credentials");
  }

  checkValidUser(isUserExist);

  const { accessToken, refreshToken } = await createUserTokens(isUserExist);

  return {
    user: isUserExist,
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  decoded: JwtPayload,
  newPassword: string,
  oldPassword: string
) => {
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: { password: true },
  });

  const isOldPasswordMatched = await compare(
    oldPassword,
    user?.password as string
  );

  if (!isOldPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Old password does not match");
  }

  await prisma.user.update({
    where: { id: decoded.userId },
    data: { password: newPassword },
  });
};

export const AuthServices = {
  credentialsLogin,
  changePassword,
};
