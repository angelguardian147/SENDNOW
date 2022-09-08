import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/interfaces/chats';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() chat!: Chat;

  constructor() { }

  ngOnInit(): void {
  }

}
