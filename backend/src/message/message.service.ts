/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository.js';
import { AuthService } from '../auth/auth.service.js';

@Injectable()
export class MessageService {
    constructor(private readonly messageRepository: MessageRepository, private readonly authService: AuthService) {}

    async getMessages(token: string, agent: string) {
        const authId = await this.authService.verifySessionToken(token.replace('Bearer ', ''))
        if (agent == 'analyzer') {
            const messages = await this.messageRepository.getAnalyzerMessages(authId)
            return { messages: messages }
        }
        else if (agent == 'generator') {
            const messages = await this.messageRepository.getGeneratorMessages(authId)
            return { messages: messages }
        }
        else {
            throw new BadRequestException()
        }     
    }
}
