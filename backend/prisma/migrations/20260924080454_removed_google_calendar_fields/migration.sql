/*
  Warnings:

  - You are about to drop the column `access_token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `calendar_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_access_token_key";

-- DropIndex
DROP INDEX "User_calendar_id_key";

-- DropIndex
DROP INDEX "User_refresh_token_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "access_token",
DROP COLUMN "calendar_id",
DROP COLUMN "refresh_token";
