/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtModule } from '@nestjs/jwt';
import { constants } from './constants.js';

@Module({
  imports: [
    JwtModule.register({
    global: true,
    secret: constants.secret,
    signOptions: { expiresIn: '2h' }
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
