/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { CompanionService } from './companion.service.js';
import { Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard.js';
import { Socket } from "socket.io"

@WebSocketGateway()
export class CompanionGateway {
  constructor(private readonly companionService: CompanionService) {}
  @SubscribeMessage('analyze')
  @UseGuards(AuthGuard)
  async handleAnalyzer(@ConnectedSocket() client: Socket, @MessageBody() payload: any){
    const auth = client.handshake.headers.authorization
    console.log(payload)
    const response = await this.companionService.handleMessage(payload, auth!)
    client.emit('analyze', response) 
  }

  @SubscribeMessage('generate')
  @UseGuards(AuthGuard)
  async handleGenerator(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    const auth = client.handshake.headers.authorization
    const response = await this.companionService.handleMessage(payload, auth!)
    client.emit('generate', response)
  }

  @SubscribeMessage('analyze-test')
  @UseGuards(AuthGuard)
  async handleAnalyzerTest(@ConnectedSocket() client: Socket, @MessageBody() payload: any){
    const auth = client.handshake.headers.authorization
    const response = await this.companionService.handleMessageTest(payload, auth!)
    client.emit('analyze-test', response) 
  }

  @SubscribeMessage('generate-test')
  @UseGuards(AuthGuard)
  async handleGeneratorTest(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
    const auth = client.handshake.headers.authorization
    const response = await this.companionService.handleMessageTest(payload, auth!)
    client.emit('generate-test', response)
  }

  @SubscribeMessage('summary')
  @UseGuards(AuthGuard)
  async handleSummary(@ConnectedSocket() client: Socket) {
    const auth = client.handshake.headers.authorization
    const response = await this.companionService.handleSummary(auth!)
    client.emit('summary', response)
  }
}
