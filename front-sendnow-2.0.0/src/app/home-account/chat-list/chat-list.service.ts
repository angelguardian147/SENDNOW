import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Chat } from 'src/app/interfaces/chats';
import { LoginService } from 'src/app/login/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatListService {

  constructor(private loginService: LoginService,
              private http:   HttpClient) { }

  getChats(): Observable<Chat[]>{
    return this.http.get<Chat[]>(`${environment.BASE_URL}/user/chats/${this.loginService.getData()}`,
          {'headers': new HttpHeaders({'Authorization': `Bearer ${this.loginService.getToken()}`})}).pipe(
            tap({
              next: (res) => {
                
              }
            })
          );
  }

}
