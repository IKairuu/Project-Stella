/* eslint-disable prettier/prettier */
import { CreateTasks } from "./dto/CreateTasks.js";
import { prisma } from "../prisma.js";
import { EditTasks } from "./dto/EditTasks.js";

export class TaskRepository {
    async createTask(createTask: CreateTasks, userId: string) {
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

    async getTasks(userId: string) {
        const tasks = await prisma.task.findMany({
            where: {
                user_id: userId
            },
            select: {
                id: true,
                event_id: true,
                task_name: true,
                task_detail: true,
                priority: true,
                complexity: true,
                start_time: true,
                end_time: true
            }
        })
        return tasks
    }

    async editTasks(taskData: EditTasks, userId: string) {
        await prisma.$transaction(async (tx) => {
            await tx.task.update({
                where: { id: taskData.id, user_id: userId },
                data: {
                    task_name: taskData.task_name,
                    task_detail: taskData.task_detail,
                    priority: taskData.priority,
                    complexity: taskData.complexity,
                    start_time: taskData.start_time,
                    end_time: taskData.end_time
                }
            })
        })
    }

    async deleteTask(taskId: string, userId: string){
        await prisma.$transaction(async (tx) => {
            await tx.task.delete({
                where: {
                    id: taskId,
                    user_id: userId
                }
            })
        })
    }
}