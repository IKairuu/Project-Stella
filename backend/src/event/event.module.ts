/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EventController } from './event.controller.js';
import { EventService } from './event.service.js';
import { EventRepository } from './event.repository.js';
import { JwtModule } from '@nestjs/jwt';
import { constants } from '../auth/constants.js';
import { AuthModule } from '../auth/auth.module.js';
import { AuthService } from '../auth/auth.service.js';

@Module({
  imports: [
    JwtModule.register({secret: constants.secret}),
    AuthModule
  ],
  controllers: [EventController],
  providers: [EventService, EventRepository, AuthService]
})
export class EventModule {}
