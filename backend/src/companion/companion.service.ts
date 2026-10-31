/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Message } from './dto/message.dto.js';
import { Service } from './service/service.js'
import { Summary } from './dto/summary.dto.js';

@Injectable()
export class CompanionService {
    constructor(private readonly service: Service) {}
    async handleMessage(payload: Message) {
        return await this.service.postMessage(payload); 
    }

    async handleMessageTest(payload: Message) {
        return await this.service.postMessageTest(payload); 
    }

    async handleSummary(payload: Summary) {
        return await this.service.getSummary(payload); 
    }
}
