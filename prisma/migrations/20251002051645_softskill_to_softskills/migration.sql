/*
  Warnings:

  - The values [SOFT_SKILL] on the enum `SkillSet` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SkillSet_new" AS ENUM ('FRONTEND', 'BACKEND', 'DATABASE', 'TOOLS', 'SOFT_SKILLS');
ALTER TABLE "Skill" ALTER COLUMN "skillset" TYPE "SkillSet_new" USING ("skillset"::text::"SkillSet_new");
ALTER TYPE "SkillSet" RENAME TO "SkillSet_old";
ALTER TYPE "SkillSet_new" RENAME TO "SkillSet";
DROP TYPE "public"."SkillSet_old";
COMMIT;
