import { OnGatewayConnection, 
        OnGatewayDisconnect, 
        OnGatewayInit, 
        SubscribeMessage, 
        WebSocketGateway, 
        WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Email } from 'src/auth/strategies/email.decorator';
import { EmailPayload } from 'src/interfaces/email.payload';

@WebSocketGateway(81,{
  cors: {
    origin: 'http://localhost:4200'
  }
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  afterInit(server: any){
    console.log('iniciamos')
  }

  handleConnection(client: any, ...args: any[]) {
      console.log('alguien se conecto al socket')
  }

  handleDisconnect(client: any) {
      console.log('alguien se desconecto')
  }

  @SubscribeMessage('join_room')
  handleJoinRoom(client: any, message: string): boolean {
    
    return true;
  }

  @SubscribeMessage('send_message')
  handleIncommingMessage(client: Socket, message: []){
    console.log(message);
  }

}
