/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TaskController } from './task.controller.js';
import { TaskService } from './task.service.js';
import { TaskRepository } from './task.repository.js';
import { JwtModule } from '@nestjs/jwt';
import { constants } from '../auth/constants.js';
import { AuthModule } from '../auth/auth.module.js';
import { AuthService } from '../auth/auth.service.js';

@Module({
  imports: [JwtModule.register({secret: constants.secret}),
    AuthModule
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, AuthService]
})
export class TaskModule {}
