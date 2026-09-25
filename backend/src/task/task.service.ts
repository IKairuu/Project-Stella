/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository.js';
import { CreateTask } from './dto/CreateTask.dto.js';

@Injectable()
export class TaskService {
    constructor(private readonly taskRepository: TaskRepository)  {}

    createTask(createTask: CreateTask) {}
}
