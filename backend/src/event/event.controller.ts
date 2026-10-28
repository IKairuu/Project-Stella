/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Headers, HttpCode, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { EventService } from './event.service.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { CreateEvent } from './dto/CreateEvent.dto.js';
import { EditEvent } from './dto/EditEvent.dto.js';

@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @UseGuards(AuthGuard)
    @Post('v1')
    @HttpCode(200)
    createEvent(@Headers('authorization') auth:string, @Body(ValidationPipe) createEvent: CreateEvent) {
        return this.eventService.createEvent(auth, createEvent)
    }

    @UseGuards(AuthGuard)
    @Get('v1')
    @HttpCode(200)
    getEvents(@Headers('authorization') auth: string) {
        return this.eventService.getEvents(auth)
    }

    @UseGuards(AuthGuard)
    @Patch('v1')
    @HttpCode(200)
    editEvents(@Headers('authorization') auth: string, @Body(ValidationPipe) eventData: EditEvent) {
        return this.eventService.editEvents(auth, eventData)
    }

    @UseGuards(AuthGuard)
    @Delete('v1/:id')
    @HttpCode(200)
    deleteEvent(@Headers('authorization') auth: string, @Param('id') eventId: string){
        return this.eventService.deleteEvent(auth, eventId)
    }

}
