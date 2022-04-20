import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatsComponent } from './chats.component';
import { ChatsService } from './chats.service';



@NgModule({
  declarations: [ChatsComponent],
  imports: [
    CommonModule, 
  ],
  providers: [ChatsService]
})
export class ChatsModule { }
