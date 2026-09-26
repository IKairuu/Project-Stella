/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prettier/prettier */
import { CreateTask } from "./dto/CreateTask.dto.js";
import { prisma } from "../prisma.js";

export class TaskRepository {
    async createTask(createTask: CreateTask, userId: string) {
        await prisma.$transaction(async (tx) => {
            await tx.task.create({data: {
            user_id: userId,
            event_id: createTask.event_id,
            task_name: createTask.task_name,
            task_detail: createTask.task_detail,
            priority: createTask.priority,
            complexity: createTask.complexity,
            start_time: new Date(createTask.start_time),
            end_time: new Date(createTask.end_time)
            }})
        })
    }
}