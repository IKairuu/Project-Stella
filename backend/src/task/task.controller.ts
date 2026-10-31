/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Headers, HttpCode, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service.js';
import {  CreateTasks } from './dto/CreateTasks.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { EditTasks } from './dto/EditTasks.js';
import { CreateTaskBulk } from './dto/CreateTaskBulk.dto.js';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @UseGuards(AuthGuard)
    @Post('v1')
    @HttpCode(200)
    createTask(@Headers('authorization') auth: string, @Body(ValidationPipe) createTask: CreateTasks){
        return this.taskService.createTask(createTask, auth)
    }

    @UseGuards(AuthGuard)
    @Get('v1')
    @HttpCode(200)
    getTasks(@Headers('authorization') auth: string) {
        return this.taskService.getTasks(auth);
    }

    @UseGuards(AuthGuard)
    @Patch('v1')
    @HttpCode(200)
    editTasks(@Headers('authorization') auth: string, @Body(ValidationPipe) taskData: EditTasks) {
        return this.taskService.editTasks(auth, taskData);
    }

    @UseGuards(AuthGuard)
    @Delete('v1/:id')
    @HttpCode(200)
    deleteTask(@Headers('authorization') auth: string, @Param('id') taskId: string) {
        return this.taskService.deleteTask(auth, taskId)
    }

    @UseGuards(AuthGuard)
    @Post('v1/bulk-create')
    @HttpCode(200)
    createBulkTask(@Body(ValidationPipe) bulkTask: CreateTaskBulk, @Headers('authorization') auth: string) {
        return this.taskService.createBulkTask(bulkTask, auth)
    }
}