import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatsComponent } from './chats/chats.component';
import { ClientComponent } from './client/client.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [ 
                        {path: '', redirectTo: 'login', pathMatch: 'full'},
                        {path:'clients', component: ClientComponent},
                        {path: 'login', component: LoginComponent},
                        {path: 'chats', component: ChatsComponent},
                        {path: 'chatRoom', component: ChatRoomComponent}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
