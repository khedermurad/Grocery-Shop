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
    return localStorage.getItem('accessToken');
  }

  setToken(token: string): void{
    localStorage.setItem('accessToken', token);
  }

  logOut(): void{
    localStorage.removeItem('accessToken');
  }
  


}
