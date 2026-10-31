/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository.js';
import { CreateTasks } from './dto/CreateTasks.js';
import { AuthService } from '../auth/auth.service.js';
import { EditTasks } from './dto/EditTasks.js';
import { CreateTaskBulk } from './dto/CreateTaskBulk.dto.js';

@Injectable()
export class TaskService {
    constructor(private readonly taskRepository: TaskRepository, private readonly authService: AuthService)  {}

    async createTask(createTask: CreateTasks, token: string) {
        const authId = await this.authService.verifySessionToken(token.replace('Bearer ', ''))
        await this.taskRepository.createTask(createTask, authId)
        return {message: "Task Successfully Created"}
    }

    async getTasks(token: string) {
        const authId = await this.authService.verifySessionToken(token.replace('Bearer ', ''))
        const tasks = this.taskRepository.getTasks(authId)
        return tasks;
    }

    async editTasks(token: string, taskData: EditTasks) {
        const authId = await this.authService.verifySessionToken(token.replace('Bearer ', ''))
        await this.taskRepository.editTasks(taskData, authId)
        return { message: "Task Successfully Updated" }
    }

    async deleteTask(token: string, taskId: string) {
        const authId = await this.authService.verifySessionToken(token.replace('Bearer ', ''))
        await this.taskRepository.deleteTask(taskId, authId)
        return { message: "Task Successfully removed" }
    }

    async createBulkTask(bulkTask: CreateTaskBulk, token: string) {
        const authId = await this.authService.verifySessionToken(token.replace('Bearer ', ''))        
        for (const items of bulkTask.tasks) {
            await this.taskRepository.createTask(items, authId)
        }
        return { message: "Successfully Added" }
    }
}
