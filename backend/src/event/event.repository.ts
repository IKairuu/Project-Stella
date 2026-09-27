/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { prisma } from '../prisma.js';
import { CreateEvent } from "./dto/CreateEvent.dto.js";

@Injectable()
export class EventRepository {
    async createEvent(userId: string, createEvent:CreateEvent) {
        await prisma.$transaction(async (tx) => {
            await tx.event.create({
                data: {
                    user_id: userId,
                    title: createEvent.title,
                    description: createEvent.description,
                    start_time: new Date(createEvent.start_time),
                    end_time: new Date(createEvent.end_time)
                }
            })
        })
    }

    async getEvents(userId: string) {
        const events = await prisma.event.findMany({
            where: {
                user_id: userId
            },
            select: {
                id: true,
                title: true,
                description: true,
                start_time: true,
                end_time: true
            }
        })
        return events;
    }
}