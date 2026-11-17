/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { CompanionService } from './companion.service.js';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard.js';

@WebSocketGateway()
export class CompanionGateway {
  constructor(private readonly companionService: CompanionService) {}
  @SubscribeMessage('analyze')
  @UseGuards(AuthGuard)
  async handleAnalyzer(client: any, payload: any){
    const response = await this.companionService.handleMessage(payload)
    client.emit('analyze', response) 
  }

  @SubscribeMessage('generate')
  @UseGuards(AuthGuard)
  async handleGenerator(client: any, payload: any) {
    const response = await this.companionService.handleMessage(payload)
    client.emit('generate', response)
  }

  @SubscribeMessage('analyze-test')
  @UseGuards(AuthGuard)
  async handleAnalyzerTest(client: any, payload: any){
    const response = await this.companionService.handleMessageTest(payload)
    client.emit('analyze-test', response) 
  }

  @SubscribeMessage('generate-test')
  @UseGuards(AuthGuard)
  async handleGeneratorTest(client: any, payload: any) {
    const response = await this.companionService.handleMessageTest(payload)
    client.emit('generate-test', response)
  }

  @SubscribeMessage('summary')
  @UseGuards(AuthGuard)
  async handleSummary(client: any, payload:any) {
    const response = await this.companionService.handleSummary(payload)
    client.emit('summary', response)
  }
}
