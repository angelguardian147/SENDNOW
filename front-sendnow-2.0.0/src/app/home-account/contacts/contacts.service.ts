import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { LoginService } from 'src/app/login/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contacts: Client[] = [];

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getClients(email_user: string): Observable<any[]>{
    return this.http.get<any[]>(`${environment.BASE_URL}/user/list/${email_user}`, 
      {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})}).pipe(
        tap(
          (res) => {
            this.contacts = Object.values(res)[0];
          }
        )
      );
  }

  find(param: string): Observable<any[]>{
    return this.http.get<any[]>(`${environment.BASE_URL}/client/search/${param}`,
    {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})}).pipe(
      tap(
        (res) => {
          this.contacts = Object.values(res)[0];
        }
      )
    );
  }

  
  getPrivateList(email_user: string): Observable<any[]>{
    return this.http.get<any[]>(`${environment.BASE_URL}/user/personal_list/${email_user}`, 
      {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})}).pipe(
        tap(
          (res) => {
            this.contacts = Object.values(res)[0];
          }
        )
      );
  }

  findPersonal(param: string): Observable<any[]>{
    return this.http.get<any[]>(`${environment.BASE_URL}/client/search_personal/${param}`,
    {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})}).pipe(
      tap(
        (res) => {
          this.contacts = Object.values(res)[0];
        }
      )
    );
  }

  findClient(email: string): Observable<Client>{
    return this.http.get<Client>(`${environment.BASE_URL}/client/findClient/${email}`,
      {'headers': new HttpHeaders({'Authorization':`Bearer ${this.loginService.getToken()}`})});
  }

  create(client: Client): Observable<any>{
    return this.http.post(`${environment.BASE_URL}/client/create`, client, 
    {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})});
  }

  addContact(email_contact: string): Observable<any>{
    return this.http.post(`${environment.BASE_URL}/client/addContact`, {email_contact}, 
    {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})});
  }

  update(email: string, client: Client): Observable<any>{
    return this.http.patch(`${environment.BASE_URL}/client/update/${email}`, client, 
    {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})})
  }

  remove(email: string): Observable<any>{
    return this.http.delete(`${environment.BASE_URL}/client/delete/${email}`, 
    {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})});
  }

}
