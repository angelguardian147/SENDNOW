import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chat } from 'src/app/interfaces/chats';
import { ChatListService } from './chat-list.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit, OnDestroy {

  chats!: Chat[];
  listChatSubscription!: Subscription;

  constructor(private chatService: ChatListService) { }

  ngOnInit(): void {
    this.getListChat();
  }

  getListChat(){
    this.listChatSubscription = this.chatService.getChats().subscribe(
      {
        next: (res) => {
          console.log(Object.values(res)[0])
        }
      }
    );
  }

  ngOnDestroy(): void {
      this.listChatSubscription?.unsubscribe();
  }

}
