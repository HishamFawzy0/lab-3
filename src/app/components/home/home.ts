import { Product } from './../../service/productService/product';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/authService/auth-service';
import { CartService } from '../../service/CartService/cart';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: 'home.html',
  styleUrl: './home.css',
})
export class Home {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private Product = inject(Product);
  private cart = inject(CartService);

  data = this.auth.getUserNameFromToken();

  Products: IProduct[] = [];
  Carts: any[] = [];
  fillterdProducts: IProduct[] = [];

  ngOnInit(): void {
    this.Product.getProducts().subscribe((data) => {
      this.Products = data;
      this.fillterdProducts = this.Products;
      console.log(this.fillterdProducts);
    });
  }

  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  addToCart(product: IProduct): void {
    this.cart.AddToCart(product.id, 1).subscribe({
      next: (res) => {
        console.log('✅ Product added to cart successfully:', res);

        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: `${product.name} has been added to your cart.`,
          timer: 2000,
          showConfirmButton: false,
          position: 'top-end',
          toast: true,
        });
      },
      error: (err) => {
        console.error('❌ Error adding product to cart:', err);

        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Something went wrong while adding the product.',
          timer: 2500,
          showConfirmButton: false,
          position: 'top-end',
          toast: true,
        });
      },
    });
  }

  filterProducts(event: any): void {
    const selectedCategory = event.target.value.trim().toLowerCase();
    if (selectedCategory === '') {
      this.fillterdProducts = this.Products;
    } else {
      this.fillterdProducts = this.Products.filter((product) =>
        product.name.toLowerCase().includes(selectedCategory)
      );
    }
  }
}
