/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Message } from './dto/message.dto.js';
import { Service } from './service/service.js'

@Injectable()
export class CompanionService {
    constructor(private readonly service: Service) {}
    async handleAnalyzer(payload: Message) {
        return await this.service.postMessage(payload); 
    }
}
