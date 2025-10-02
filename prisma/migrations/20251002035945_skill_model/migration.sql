-- CreateEnum
CREATE TYPE "public"."SkillSet" AS ENUM ('FRONTEND', 'BACKEND', 'DATABASE', 'TOOLS', 'SOFT_SKILL');

-- CreateTable
CREATE TABLE "public"."Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Icon" TEXT,
    "color" TEXT,
    "skillset" "public"."SkillSet" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);
