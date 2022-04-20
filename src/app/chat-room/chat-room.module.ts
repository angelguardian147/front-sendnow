import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomService } from './chat-room.service';
import { ChatRoomComponent } from './chat-room.component';



@NgModule({
  declarations: [ChatRoomComponent],
  imports: [
    CommonModule
  ],
  providers: [ChatRoomService]
})
export class ChatRoomModule { }
