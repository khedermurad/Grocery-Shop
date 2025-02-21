import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { LoginData } from '../../models/login-data';
import { AuthResponse } from '../../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth'

  constructor(private http: HttpClient) { }


  register(user: User): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, user, {responseType: 'text'});
  }

  checkUsername(username: String): Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}/check-username?username=${username}`);
  }

  login(loginData: LoginData): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginData);
  }

  getToken(): string | null {
    const token = localStorage.getItem('accessToken');
    if(token && this.isTokenExpired(token)){
      this.logOut();
      return null;
    }
    return token;
  }

  setToken(token: string): void{
    localStorage.setItem('accessToken', token);
  }

  logOut(): void{
    localStorage.removeItem('accessToken');
  }


  getUserRole(): string | null {
    const token = this.getToken();

    if(!token) return null;

    try{
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.roles ? payload.roles[0] : null;
    }catch(error){
      console.error("Error parsing token!");
      return null;
    }
  }


  private isTokenExpired(token: string): boolean{
    const payload = JSON.parse(atob(token.split(".")[1]))
    const expiry = payload.exp * 1000;
    return Date.now() > expiry;
  }
  


}
