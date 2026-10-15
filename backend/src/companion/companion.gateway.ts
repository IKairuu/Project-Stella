/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { CompanionService } from './companion.service.js';

@WebSocketGateway()
export class CompanionGateway {
  constructor(private readonly companionService: CompanionService) {}
  @SubscribeMessage('analyze')
  async handleAnalyzer(client: any, payload: any){
    const response = await this.companionService.handleMessage(payload)
    client.emit('analyze', response) 
  }

  @SubscribeMessage('generate')
  async handleGenerator(client: any, payload: any) {
    const response = await this.companionService.handleMessage(payload)
    client.emit('generate', response)
  }
}
