/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { readFileSync } from 'fs';
import { getApps, initializeApp, cert } from 'firebase-admin/app';

const serviceAccount = JSON.parse(readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_PATH ?? './firebase-service-account.json', 'utf8'));

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
