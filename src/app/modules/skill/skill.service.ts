import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db.config";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "../../utils/httpStatus";

const addSkill = async (payload: Prisma.SkillCreateInput) => {
  const isSkillExist = await prisma.skill.findUnique({
    where: {
      skill_name_skillset_unique: {
        name: payload.name,
        skillset: payload.skillset,
      },
    },
  });

  if (isSkillExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Skill already exists");
  }
  const skill = await prisma.skill.create({ data: payload });
  return skill;
};

export const SkillServices = {
  addSkill,
};
