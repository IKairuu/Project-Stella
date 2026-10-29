/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MessageController } from './message.controller.js';
import { MessageService } from './message.service.js';
import { MessageRepository } from './message.repository.js';
import { AuthService } from '../auth/auth.service.js';

@Module({
  controllers: [MessageController],
  providers: [MessageService, MessageRepository, AuthService]
})
export class MessageModule {}
