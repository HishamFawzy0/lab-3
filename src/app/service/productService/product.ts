import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Product {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  http: HttpClient = inject(HttpClient);
  route = inject(Router);

  getProducts():Observable<any>{
    return this.http.get('https://localhost:7133/api/Product/GetAll');
  }
}
