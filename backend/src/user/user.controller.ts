/* eslint-disable prettier/prettier */
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service.js';
import { RegisterUser } from './dto/RegisterUser.dto.js';
import { Throttle } from '@nestjs/throttler';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Throttle({short_timeframe: {limit: 5, ttl: 30000}})
    @Post('v1/google/register')
    registerUserRegistration(@Body(ValidationPipe) userCredentials: RegisterUser) {
        return this.userService.registerUserRegistration(userCredentials);
    }
}
