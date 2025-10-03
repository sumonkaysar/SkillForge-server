/*
  Warnings:

  - Changed the type of `skillset` on the `Skill` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Skillset" AS ENUM ('FRONTEND', 'BACKEND', 'DATABASE', 'TOOLS', 'SOFT_SKILLS');

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "index" INTEGER,
DROP COLUMN "skillset",
ADD COLUMN     "skillset" "Skillset" NOT NULL;

-- DropEnum
DROP TYPE "public"."SkillSet";

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_skillset_key" ON "Skill"("name", "skillset");
