/* eslint-disable prettier/prettier */
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service.js';
import { CreateTask } from './dto/CreateTask.dto.js';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post('v1')
    createTask(@Body(ValidationPipe) createTask: CreateTask){
        return this.taskService.createTask(createTask)
    }
}
