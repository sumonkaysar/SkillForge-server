import { Prisma, Skillset } from "@prisma/client";
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

const getAllSkills = async () => {
  const skills = await prisma.skill.findMany({
    select: {
      name: true,
      Icon: true,
    },
    orderBy: { name: "asc" },
  });

  return skills;
};

const getSkillsGroupedBySkillset = async () => {
  const skillsets = Object.values(Skillset);

  const groupedSkills = await Promise.all(
    skillsets.map(async (skillset) => {
      const skills = await prisma.skill.findMany({
        where: { skillset },
        select: {
          name: true,
          Icon: true,
          color: true,
          skillset: true,
        },
        orderBy: { name: "asc" },
      });

      const titleArr = skillset.split("_");
      const title = titleArr.map((t) => t.charAt(0) + t.slice(1).toLowerCase());

      return {
        title,
        skillset: skillset,
        skills: skills,
      };
    })
  );

  return groupedSkills;
};

const editSkill = async (skillId: number, payload: Prisma.SkillUpdateInput) => {
  const updatedSkill = await prisma.skill.update({
    where: { id: skillId },
    data: payload,
  });
  return updatedSkill;
};

export const SkillServices = {
  addSkill,
  getAllSkills,
  getSkillsGroupedBySkillset,
  editSkill,
};
