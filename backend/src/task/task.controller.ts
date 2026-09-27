/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Headers, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service.js';
import { CreateTask } from './dto/CreateTask.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @UseGuards(AuthGuard)
    @Post('v1')
    createTask(@Headers('authorization') auth: string, @Body(ValidationPipe) createTask: CreateTask){
        return this.taskService.createTask(createTask, auth)
    }

    @UseGuards(AuthGuard)
    @Get('v1')
    getTasks(@Headers('authorization') auth: string) {
        return this.taskService.getTasks(auth);
    }
}