/*
  Warnings:

  - You are about to drop the column `firtst_name` on the `users` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `firtst_name`,
    ADD COLUMN `first_name` VARCHAR(100) NOT NULL;
