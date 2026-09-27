/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EventController } from './event.controller.js';
import { EventService } from './event.service.js';
import { EventRepository } from './event.repository.js';

@Module({
  controllers: [EventController],
  providers: [EventService, EventRepository]
})
export class EventModule {}
