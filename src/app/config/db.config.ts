import { PrismaClient } from "@prisma/client";
import { userExtension } from "../extensions/user.extension";

const prismaClient = new PrismaClient();

export const prisma = prismaClient.$extends(userExtension);
