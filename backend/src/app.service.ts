/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  async getHello(): Promise<string> {
    const { data } = await firstValueFrom(
      this.httpService.get('http://localhost:5678/webhook-test/test-hook'),
    );
    return data;
  }
}
