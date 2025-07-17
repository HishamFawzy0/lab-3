import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  http: HttpClient = inject(HttpClient);
  route = inject(Router);

  jwtToken: any;
  realdata: any;

  get isLoggedIn(): boolean {
    return isPlatformBrowser(this.platformId) && !!localStorage.getItem('user');
  }

  getlogin(user: any): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7133/api/account/login',
      user
    );
  }

  userCheck() {
    if (this.isLoggedIn) {
      this.route.navigate(['/home']);
    } else {
      this.route.navigate(['/Login']);
    }
  }

  getUserNameFromToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const token = this.jwtToken || localStorage.getItem('user');
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      return (
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
        ] || null
      );
    } catch (err) {
      console.error('❌ Invalid JWT token:', err);
      return null;
    }
  }

  login() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', this.jwtToken);
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
  } 

  register(user: any): Observable<any> {
    return this.http.post('https://localhost:7133/api/account/register', user, {
      responseType: 'text',
    });
  }
}
