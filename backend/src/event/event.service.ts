/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { EventRepository } from './event.repository.js';
import { CreateEvent } from './dto/CreateEvent.dto.js';
import { AuthService } from '../auth/auth.service.js';


@Injectable()
export class EventService {
    constructor(private readonly eventRepository: EventRepository, private readonly authService: AuthService) {}

    async createEvent(token: string, createEvent: CreateEvent) {
        const authId = await this.authService.verifySessionToken(token.replace("Bearer ", ''))
        await this.eventRepository.createEvent(authId, createEvent)
        return { message: "Event Successfully Created" }
    }
}
