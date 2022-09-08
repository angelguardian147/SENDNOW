import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { ContactsModule } from './contacts/contacts.module';
import { ChatListModule } from './chat-list/chat-list.module';



@NgModule({
  declarations: [HomeAccountModule, ContactsModule, ChatRoomModule, ChatListModule],
  imports: [
    CommonModule
  ]
})
export class HomeAccountModule { }
