import { prisma } from "../../config/db.config";

const getMe = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { password: false },
  });

  return user;
};

export const UserServices = {
  getMe,
};
