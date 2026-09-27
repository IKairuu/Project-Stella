/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository.js';
import { CreateTask } from './dto/CreateTask.dto.js';
import { AuthService } from '../auth/auth.service.js';

@Injectable()
export class TaskService {
    constructor(private readonly taskRepository: TaskRepository, private readonly authService: AuthService)  {}

    async createTask(createTask: CreateTask, token: string) {
        const authId = await this.authService.verifySessionToken(token.replace('Bearer ', ''))
        await this.taskRepository.createTask(createTask, authId)
        return {message: "Task Successfully Created"}
    }

    async getTasks(token: string) {
        const authId = await this.authService.verifySessionToken(token.replace('Bearer ', ''))
        const tasks = this.taskRepository.getTasks(authId)
        return tasks;
    }
}
