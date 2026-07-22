/*
  Warnings:

  - The values [Create,Edit,Delete] on the enum `Action` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `details` on the `history` table. All the data in the column will be lost.
  - Added the required column `entity` to the `history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newValue` to the `history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Action_new" AS ENUM ('create', 'update', 'delete');
ALTER TABLE "history" ALTER COLUMN "action" TYPE "Action_new" USING ("action"::text::"Action_new");
ALTER TYPE "Action" RENAME TO "Action_old";
ALTER TYPE "Action_new" RENAME TO "Action";
DROP TYPE "public"."Action_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "history" DROP CONSTRAINT "history_userId_fkey";

-- AlterTable
ALTER TABLE "history" DROP COLUMN "details",
ADD COLUMN     "entity" TEXT NOT NULL,
ADD COLUMN     "newValue" TEXT NOT NULL,
ADD COLUMN     "oldValue" TEXT;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
