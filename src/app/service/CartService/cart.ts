import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  http: HttpClient = inject(HttpClient);
  route = inject(Router);

  AddToCart(productId: number, quantity: number): Observable<any> {
    const body = {
      productId: productId,
      quantity: quantity,
    };

    return this.http.post('https://localhost:7133/api/Cart/AddToCart', body, {
      responseType: 'text' as 'json', // ✅ Angular needs this casting
    });
  }

  getCart(): Observable<any> {
    return this.http.get('https://localhost:7133/api/Cart/GetCart');
  }

  removeItem(productId: number): Observable<any> {
    return this.http.delete(
      `https://localhost:7133/api/Cart/RemoveItem/${productId}`,
      {
        responseType: 'text' as 'json', // ✅ Angular needs this casting
      }
    );
  }

  clearCart(): Observable<any> {
    return this.http.delete('https://localhost:7133/api/Cart/ClearCart/clear', {
      responseType: 'text' as 'json', // ✅ Angular needs this casting
    });
  }

  //IncrementQuantity
  IncrementQuantity(productId: number): Observable<any> {
    return this.http.put(
      `https://localhost:7133/api/Cart/IncrementQuantity/increment/${productId}`,
      null, // لازم تبعت null لأن PUT بياخد body
      {
        responseType: 'text' as 'json',
      }
    );
  }

  //DecrementQuantity
  DecrementQuantity(productId: number): Observable<any> {
    return this.http.put(
      `https://localhost:7133/api/Cart/DecrementQuantity/decrement/${productId}`,
      null,
      {
        responseType: 'text' as 'json',
      }
    );
  }
}
