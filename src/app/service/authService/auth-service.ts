import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);

  jwtToken: any;
  realdata: any;

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getlogin(user: any): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7133/api/account/login',
      user
    );
  }

  getUserNameFromToken(): string | null {
    const token = this.jwtToken || localStorage.getItem('user'); // استرجاع التوكن من localStorage
    if (!token) return null;

    const decodedToken: any = jwtDecode(token);

    // Access the claim for name
    return (
      decodedToken[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
      ] || null
    );
  }

  login() {
    localStorage.setItem('user', this.jwtToken);
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user: any): Observable<any> {
    return this.http.post('https://localhost:7133/api/account/register', user, {
      responseType: 'text',
    });
  }
}
