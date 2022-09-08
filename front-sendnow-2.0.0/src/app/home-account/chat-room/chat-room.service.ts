import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService  {

  showChatRoom: boolean = false;
  email!: string;
  username!: string;

  constructor(private socket: Socket) {}

  joinRoom(){
    
  }

  sendMessage(message: string, email: string, email_user: string){
   this.socket.emit('send_message', message, email, email_user)
  }

}
