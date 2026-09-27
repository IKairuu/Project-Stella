-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
