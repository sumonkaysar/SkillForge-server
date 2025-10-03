/*
  Warnings:

  - Made the column `githubFrontend` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `githubBackend` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `liveDemo` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "githubFrontend" SET NOT NULL,
ALTER COLUMN "githubBackend" SET NOT NULL,
ALTER COLUMN "liveDemo" SET NOT NULL;
