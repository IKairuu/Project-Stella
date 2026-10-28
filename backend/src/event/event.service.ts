/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { EventRepository } from './event.repository.js';
import { CreateEvent } from './dto/CreateEvent.dto.js';
import { AuthService } from '../auth/auth.service.js';
import { EditEvent } from './dto/EditEvent.dto.js';


@Injectable()
export class EventService {
    constructor(private readonly eventRepository: EventRepository, private readonly authService: AuthService) {}

    async createEvent(token: string, createEvent: CreateEvent) {
        const authId = await this.authService.verifySessionToken(token.replace("Bearer ", ''))
        await this.eventRepository.createEvent(authId, createEvent)
        return { message: "Event Successfully Created" }
    }


    async getEvents(token: string) {
        const authId = await this.authService.verifySessionToken(token.replace("Bearer ", ''))
        const events = await this.eventRepository.getEvents(authId)
        return events
    }

    async editEvents(token: string, eventData: EditEvent) {
        const authId = await this.authService.verifySessionToken(token.replace("Bearer ", ''))
        await this.eventRepository.editEvent(eventData, authId)
        return { message: "Event Successfully Updated" }
    }

    async deleteEvent(token: string, eventId: string) {
        const authId = await this.authService.verifySessionToken(token.replace("Bearer ", ''))
        await this.eventRepository.deleteEvent(eventId, authId)
        return { message: "Successfully removed" }
    }
}
