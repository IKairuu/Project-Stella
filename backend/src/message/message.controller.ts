/* eslint-disable prettier/prettier */
import { Controller, Get, Headers, HttpCode, Query, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service.js';
import { AuthGuard } from '../auth/auth.guard.js';

@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}
    
    @UseGuards(AuthGuard)
    @Get('v1')
    @HttpCode(200)
    getAnalyzerMessages(@Headers('authorization') auth: string, @Query('type') agent: string) {
        return this.messageService.getMessages(auth, agent)
    }
}
