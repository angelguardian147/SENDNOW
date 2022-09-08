import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomComponent } from './chat-room.component';
import { ChatRoomService } from './chat-room.service';


@NgModule({
  declarations: [
    ChatRoomComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ChatRoomService
  ]
})
export class ChatRoomModule { }
