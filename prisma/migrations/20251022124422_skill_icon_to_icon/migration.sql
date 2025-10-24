/*
  Warnings:

  - You are about to drop the column `publishedAt` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `Icon` on the `Skill` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "publishedAt";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "Icon",
ADD COLUMN     "icon" TEXT;
