/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service.js';
import { RegisterUser } from './dto/RegisterUser.dto.js';
import { Throttle } from '@nestjs/throttler';
import { UserCredential } from './dto/UserCredential.dto.js';
import { UserLoginCredential } from './dto/UserLoginCredential.dto.js';
import { SessionService } from '../session/session.service.js';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService, private readonly sessionService: SessionService) {}

    @Throttle({short_timeframe: {limit: 5, ttl: 30000}})
    @Post('v1/google/register')
    @HttpCode(200)
    registerUserRegistration(@Body(ValidationPipe) userCredentials: RegisterUser) {
        return this.userService.registerUserRegistration(userCredentials);
    }

    @Throttle({short_timeframe: {limit: 5, ttl: 30000}})
    @Post('v1/google/register/:id')
    @HttpCode(200)
    registerUser(@Body(ValidationPipe) userCredentials: UserCredential, @Param('id') token: string) {
        return this.userService.registerUser(userCredentials, token);
    }
    @Throttle({short_timeframe: {limit: 5, ttl: 30000}})
    @Post('v1/login')
    @HttpCode(200)
    loginUser(@Query('type') loginType: string, @Body(ValidationPipe) userLoginCredentials: UserLoginCredential) {
        return this.userService.loginUser(loginType, userLoginCredentials);
    }
}
