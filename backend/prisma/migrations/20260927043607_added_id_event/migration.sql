-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_event_id_fkey";

-- AlterTable
ALTER TABLE "Event" ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "Event_id_key";