/* eslint-disable prettier/prettier */
import { Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { EventService } from './event.service.js';
import { AuthGuard } from '../auth/auth.guard.js';

@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @UseGuards(AuthGuard)
    @Post('v1')
    createEvent(@Headers('authorization') auth:string) {
        
    }

}
