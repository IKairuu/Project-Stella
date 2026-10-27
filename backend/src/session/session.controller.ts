/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, HttpCode, Param } from '@nestjs/common';
import { SessionService } from './session.service.js';

@Controller('sessions')
export class SessionController {
    constructor(private readonly sessionService: SessionService) {}

    @HttpCode(200)
    @Get('v1/:id')
    verifySession(@Param('id') sessionId: string) {
        return this.sessionService.verifySession(sessionId)
    }

    @HttpCode(200)
    @Delete('v1/:id')
    logoutSession(@Param('id') sessionId: string) {
        return this.sessionService.logoutSession(sessionId)
    }
}
