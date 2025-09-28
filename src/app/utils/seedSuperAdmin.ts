/* eslint-disable no-console */
import { Prisma, UserRole, UserStatus } from "@prisma/client";
import { prisma } from "../config/db.config";
import envVars from "../config/env.config";

const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await prisma.user.findUnique({
      where: { email: envVars.SUPER_ADMIN_EMAIL },
    });

    if (isSuperAdminExist) {
      console.log("Super admin already exists!");
      return;
    }

    console.log("Trying to create super admin...");

    const data: Prisma.UserCreateInput = {
      name: envVars.SUPER_ADMIN_NAME,
      email: envVars.SUPER_ADMIN_EMAIL,
      password: envVars.SUPER_ADMIN_PASS,
      role: UserRole.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      isVerified: true,
    };

    await prisma.user.create({ data });

    console.log("Super admin created successfully");
  } catch (error) {
    console.log(error);
  }
};

export default seedSuperAdmin;
