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

    // read from local storage
    const storedCart = localStorage.getItem('cart');
    this.Carts = storedCart ? JSON.parse(storedCart) : [];
    
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
    // remove from local storage
    localStorage.setItem('cart', JSON.stringify(this.Carts));

  }

  decrement(index: number) {
    this.Carts[index].quantity -= 1;

    if (this.Carts[index].quantity <= 0) {
      this.removeItem(index);
    }
  }

  increment(index: number) {
    this.Carts[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(this.Carts));
  }
}
