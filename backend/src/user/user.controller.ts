/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service.js';
import { RegisterUser } from './dto/RegisterUser.dto.js';
import { Throttle } from '@nestjs/throttler';
import { UserCredential } from './dto/UserCredential.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Throttle({short_timeframe: {limit: 5, ttl: 30000}})
    @Post('v1/google/register')
    registerUserRegistration(@Body(ValidationPipe) userCredentials: RegisterUser) {
        return this.userService.registerUserRegistration(userCredentials);
    }

    @Throttle({short_timeframe: {limit: 5, ttl: 30000}})
    @UseGuards(AuthGuard)
    @Post('v1/google/register/:id')
    registerUser(@Body(ValidationPipe) userCredentials: UserCredential, @Param('id') token: string) {
        return this.userService.registerUser(userCredentials, token);
    }
}
