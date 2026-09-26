/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository.js';
import { CreateTask } from './dto/CreateTask.dto.js';
import { AuthService } from '../auth/auth.service.js';

@Injectable()
export class TaskService {
    constructor(private readonly taskRepository: TaskRepository, private readonly authService: AuthService)  {}

    async createTask(createTask: CreateTask, token: string) {
        const auth = token.replace('Bearer ', '')
        const authId = await this.authService.verifySessionToken(auth)
        await this.taskRepository.createTask(createTask, authId)
        return {message: "Task Successfully Created"}
    }
}
