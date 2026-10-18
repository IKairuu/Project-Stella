/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Headers, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service.js';
import {  CreateTasks } from './dto/CreateTasks.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { EditTasks } from './dto/EditTasks.js';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @UseGuards(AuthGuard)
    @Post('v1')
    createTask(@Headers('authorization') auth: string, @Body(ValidationPipe) createTask: CreateTasks){
        return this.taskService.createTask(createTask, auth)
    }

    @UseGuards(AuthGuard)
    @Get('v1')
    getTasks(@Headers('authorization') auth: string) {
        return this.taskService.getTasks(auth);
    }

    @UseGuards(AuthGuard)
    @Patch('v1')
    editTasks(@Headers('authorization') auth: string, @Body(ValidationPipe) taskData: EditTasks) {
        return this.taskService.editTasks(auth, taskData);
    }
}