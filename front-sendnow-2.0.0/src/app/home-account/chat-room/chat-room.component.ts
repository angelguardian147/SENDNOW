import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/interfaces/chats';
import { LoginService } from 'src/app/login/login.service';
import { ChatRoomService } from './chat-room.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  message!: string;
  chat!: Chat;
  
  constructor(public chatRoomService: ChatRoomService,
              private loginService: LoginService) { }

  ngOnInit(): void {
  }

  sendMessage(){
    this.chatRoomService.sendMessage(this.message, this.chatRoomService.email, this.loginService.getData());
  }

}
