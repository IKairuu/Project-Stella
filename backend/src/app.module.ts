/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from './user/user.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TaskModule } from './task/task.module.js';
import { EventModule } from './event/event.module.js';
import { SessionModule } from './session/session.module.js';

@Module({
  imports: [HttpModule.register({ timeout: 5000, maxRedirects: 5 }), 
    UserModule, 
    AuthModule, 
    ThrottlerModule.forRoot([
      { name: 'short_timeframe', ttl: 1000, limit: 5 },
      { name: 'long_timeframe', ttl: 30000, limit: 100 },
    ]), TaskModule, EventModule, SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
