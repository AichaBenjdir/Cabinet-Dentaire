import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  authenticate(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post('http://votre-api-url/auth/login', credentials);
  }
}
