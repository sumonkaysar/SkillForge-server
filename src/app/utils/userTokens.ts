import { User } from "@prisma/client";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import envVars from "../config/env.config";
import { checkUserExist } from "./checkUserValidity";

const generateToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, { expiresIn } as SignOptions);
  return token;
};

export const verifyToken = (token: string, secret: string) => {
  const verifiedToken = jwt.verify(token, secret);
  return verifiedToken;
};

export const createUserTokens = async (user: User, needRefresh = true) => {
  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const tokens = {} as { accessToken: string; refreshToken: string };

  tokens.accessToken = generateToken(
    jwtPayload,
    envVars.JWT_SECRET,
    envVars.JWT_EXPIRES_IN
  );

  if (needRefresh) {
    tokens.refreshToken = generateToken(
      jwtPayload,
      envVars.JWT_REFRESH_SECRET,
      envVars.JWT_REFRESH_EXPIRES_IN
    );
  }

  return tokens;
};

export const createNewAccessTokenWithRefreshToken = async (
  refreshToken: string
) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as JwtPayload;

  const isUserExist = await checkUserExist({
    email: verifiedRefreshToken.email,
  });

  const { accessToken } = await createUserTokens(isUserExist, false);

  return accessToken;
};
