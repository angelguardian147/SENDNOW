import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { JwtResponse } from '../interfaces/jwt-response';
import { Login } from '../interfaces/login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isAuth: boolean = false;

  constructor(private http: HttpClient, private cookie: CookieService) { }

  //username and password must be the same that in the super() method in the local strategy of the server
  login(username: string, password: string): Observable<JwtResponse>{
    return this.http.post<JwtResponse>(`${environment.BASE_URL}/user/login`, {username, password}).pipe(tap(
      (res: JwtResponse) => {
        if(res && res.access_token && res.email){
          this.setToken(res.access_token);
          this.setData(res.email);
          this.isAuth = true;
        }
      }
    ));
  }

  create(login: Login): Observable<JwtResponse>{
    return this.http.post<JwtResponse>(`${environment.BASE_URL}/user/create`, login).pipe(tap(
      (res: JwtResponse) => {
        if(res && res.email && res.access_token){
          this.setToken(res.access_token);
          this.setData(res.email);
          this.isAuth = true;
        }
      },
      (err: HttpErrorResponse) => {
        err.error.message
      }
    ));
  }

  profile(): Observable<JwtResponse>{
    return this.http.get<JwtResponse>(`${environment.BASE_URL}/user/profile`, 
      {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.getToken()}`})}).pipe(
        tap(
          (res) => {
            if(res?.email){
              this.isAuth = true;
            }else{
              this.isAuth = false;
            }
          },
          (err) => {
            this.isAuth = false;
          }
        )
      );
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.BASE_URL}/user/authenticated`,
      { 'headers': new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` }) }).pipe(
        tap(
          (res) => {
            if(res){
              this.isAuth = true;
            }else{
              this.isAuth = false;
            }
          },
          (err) => {
            this.isAuth = false;
          }
        )
      );
  }

  getUserEmail(email: string): Observable<string>{
    return this.http.get<string>(`${environment.BASE_URL}/user/finduser/${email}`, 
      {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.getToken()}`})})
  }

  private setData(email: string){
    sessionStorage.setItem('email', email);
  }

  getData(): any{
    return sessionStorage.getItem('email');
  }

  private setToken(token: string): void{
    this.cookie.set("token", token);
  }

  getToken(): string{
    return this.cookie.get("token");;
  }

  logOut(): void{
    this.cookie.delete("token");
    sessionStorage.removeItem('email');
    this.isAuth = false;
  }

}
