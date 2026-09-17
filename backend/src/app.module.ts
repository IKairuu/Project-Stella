/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from './user/user.module.js';

@Module({
  imports: [HttpModule.register({ timeout: 5000, maxRedirects: 5 }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
