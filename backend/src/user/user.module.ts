/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
import { UserRepository } from './user.repository.js';
import { JwtModule } from '@nestjs/jwt';
import { constants } from '../auth/constants.js';
import { SessionModule } from '../session/session.module.js';
import { AuthService } from '../auth/auth.service.js';

@Module({
  imports: [
    JwtModule.register({
    secret: constants.secret,
    signOptions: { expiresIn: '5m' }
  }),
  SessionModule
  ],  
  controllers: [
    UserController, 
  ],
  providers: [UserService, UserRepository,AuthService]
})
export class UserModule {}
