/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
import { UserRepository } from './user.repository.js';
import { JwtModule } from '@nestjs/jwt';
import { constants } from '../auth/constants.js';

@Module({
  imports: [
    JwtModule.register({
    secret: constants.secret,
    signOptions: { expiresIn: '5m' }
  })
  ],  
  controllers: [
    UserController, 
  ],
  providers: [UserService, UserRepository]
})
export class UserModule {}
