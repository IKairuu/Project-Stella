/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class CompanionGateway {
  @SubscribeMessage('analyze')
  handleAnalyzer(client: any, payload: any){
    client.emit('analyze', 'Analyzer') 
  }

  @SubscribeMessage('generate')
  handleGenerator(client: any, payload: any) {
    client.emit('generate', 'Generator') 
  }
}
