import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

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


}
