/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Headers, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { EventService } from './event.service.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { CreateEvent } from './dto/CreateEvent.dto.js';

@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @UseGuards(AuthGuard)
    @Post('v1')
    createEvent(@Headers('authorization') auth:string, @Body(ValidationPipe) createEvent: CreateEvent) {
        return this.eventService.createEvent(auth, createEvent)
    }

    @UseGuards(AuthGuard)
    @Get('v1')
    getEvents(@Headers('authorization') auth: string) {
        return this.eventService.getEvents(auth)
    }

}
