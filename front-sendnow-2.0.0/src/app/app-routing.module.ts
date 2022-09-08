import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ChatListComponent } from './home-account/chat-list/chat-list.component';
import { ChatRoomComponent } from './home-account/chat-room/chat-room.component';
import { ContactsComponent } from './home-account/contacts/contacts.component';
import { HomeAccountComponent } from './home-account/home-account.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
                        {path: '', component: HomeComponent},
                        {path: 'login', component: LoginComponent},
                        {path: 'account', component: HomeAccountComponent,
                          canActivate: [AuthGuard],
                          canActivateChild: [AuthGuard],
                          children: [
                            {path: '', component: ContactsComponent},
                            {path: 'chats', component: ChatListComponent},
                            {path: 'chat-room', component: ChatRoomComponent},
                            {path: '**', redirectTo: '', pathMatch: 'full'},
                          ]
                        },
                        {path: '**', redirectTo: '', pathMatch: 'full'},
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
