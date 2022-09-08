import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { AddClientComponent } from './login/add-client/add-client.component';
import { HomeAccountComponent } from './home-account/home-account.component';
import { HomeComponent } from './home/home.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { ContactsComponent } from './home-account/contacts/contacts.component';
import { CardComponent } from './home-account/contacts/card/card.component';
import { AddContactComponent } from './home-account/contacts/add-contact/add-contact.component';
import { DeleteContactComponent } from './home-account/contacts/card/delete-contact/delete-contact.component';
import { ChatListComponent } from './home-account/chat-list/chat-list.component';
import { ChatRoomComponent } from './home-account/chat-room/chat-room.component';
import { ChatComponent } from './home-account/chat-list/chat/chat.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:81', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    AddClientComponent,
    HomeAccountComponent,
    HomeComponent,
    MenuLateralComponent,
    ContactsComponent,
    CardComponent,
    AddContactComponent,
    DeleteContactComponent,
    ChatListComponent,
    ChatRoomComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
