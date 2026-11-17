/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Message } from './dto/message.dto.js';
import { Service } from './service/service.js'
import { AuthService } from '../auth/auth.service.js';

@Injectable()
export class CompanionService {
    constructor(private readonly service: Service, private readonly authService: AuthService) {}
    async handleMessage(payload: Message, token: string) {
        const authId = await this.authService.verifySessionToken(token.replace('Bearer ', ''))
        return await this.service.postMessage(payload, authId); 
    }

    async handleMessageTest(payload: Message, token: string) {
        console.log(token)
        const authId = await this.authService.verifySessionToken(token.replace('Bearer ', ''))
        return await this.service.postMessageTest(payload, authId); 
    }

    async handleSummary(token: string) {
        const authId = await this.authService.verifySessionToken(token.replace('Bearer ', ''))
        return await this.service.getSummary(authId); 
    }
}
