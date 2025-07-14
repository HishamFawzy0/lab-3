import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { IProduct } from '../../interface/Produc/iproduct';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private http = inject(HttpClient);

  Products: IProduct[] = [];
  Carts: any[] = [];
  fillterdProducts: IProduct[] = [];

  ngOnInit(): void {
    this.http.get('Products.json').subscribe((data) => {
      this.Products = data as IProduct[];
      this.fillterdProducts = this.Products;
    });
  }

  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getAveRaating(product: IProduct): number {
    const avg =
      product.reviews.reduce((total, review) => total + review.rating, 0) /
      product.reviews.length;

    return +avg.toFixed(1);
  }

  addToCart(product: IProduct): void {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
    const storedCart = localStorage.getItem('cart');
    this.Carts = storedCart ? JSON.parse(storedCart) : [];

    const cartItem = this.Carts.find((item) => item.id === product.id);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      this.Carts.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(this.Carts));
  }

  filterProducts(event: any): void {
    const selectedCategory = event.target.value.trim().toLowerCase();
    if (selectedCategory === '') {
      this.fillterdProducts = this.Products;
    } else {
      this.fillterdProducts = this.Products.filter((product) =>
        product.title.toLowerCase().includes(selectedCategory)
      );
    }

    // addToCart(product: IProduct): void {
    //   const cartItem = this.Carts.find((item) => item.id === product.id);
    //   if (cartItem) {
    //     cartItem.quantity++;
    //   } else {
    //     this.Carts.push({ ...product, quantity: 1 });
    //   }
    // }
  }
}
