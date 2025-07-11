import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ICart } from '../../interface/Cart/icart';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private http = inject(HttpClient);

  Carts!: ICart[];

  ngOnInit(): void {
    this.http
      .get('Cart.json')
      .subscribe((data) => (this.Carts = data as ICart[]));
  }

  getTotal(): any {
    let total = 0;
    for (let i = 0; i < this.Carts.length; i++) {
      total += this.Carts[i].price * this.Carts[i].quantity;
    }
    return total.toFixed(2);
  }

  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
  removeItem(index: number) {

    this.Carts.splice(index, 1);
    
    this.http
      .put('Cart.json', this.Carts)
      .subscribe((data) => console.log(data));
  }

  decrement(index: number) {
    this.Carts[index].quantity -= 1;
    this.http
      .put('Cart.json', this.Carts)
      .subscribe((data) => console.log(data));
  }

  increment(index: number) {
    this.Carts[index].quantity += 1;
    this.http
      .put('Cart.json', this.Carts)
      .subscribe((data) => console.log(data));
  }


}
