import { Component, inject } from '@angular/core';
import { ICart } from '../../interface/Cart/icart';
import { CartService } from './../../service/CartService/cart';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private cartService = inject(CartService);

  cart: ICart = {
    id: 0,
    userId: '',
    items: [],
  };

  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cart = res;
        console.log('✅ Cart loaded:', this.cart);
      },
      error: (err) => {
        console.error('❌ Failed to load cart:', err);
      },
    });
  }

  getTotal(): string {
    let total = 0;
    for (let item of this.cart.items) {
      total += item.price * item.quantity;
    }
    return total.toFixed(2);
  }

  removeItem(id: number) {
    const item = this.cart.items.find((i) => i.productId === id);
    if (!item) return;

    Swal.fire({
      title: `<strong>Remove "${item.productName}"?</strong>`,
      html: `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <p style="margin: 10px 0;">This action cannot be undone!</p>
          <img src="${item.imageUrl}" alt="${item.productName}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.2);" />
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      width: 400,
      padding: '1.5rem',
      background: '#fff',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeItem(id).subscribe({
          next: (res) => {
            console.log('✅ Item removed successfully:', res);
            this.cart.items = this.cart.items.filter((i) => i.productId !== id);

            Swal.fire({
              title: 'Removed!',
              text: `${item.productName} has been removed from your cart.`,
              icon: 'success',
              toast: true,
              position: 'top-end',
              timer: 2000,
              showConfirmButton: false,
            });
          },
          error: (err) => {
            console.error('❌ Failed to remove item:', err);

            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Could not remove item from cart.',
              toast: true,
              position: 'top-end',
              timer: 2500,
              showConfirmButton: false,
            });
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: `${item.productName} is still in your cart.`,
          icon: 'info',
          toast: true,
          position: 'top-end',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  }

  decrement(productId: number) {
    const item = this.cart.items.find((i) => i.productId === productId);
    if (!item) {
      console.warn('⚠️ Item not found.');
      return;
    }

    if (item.quantity === 1) {
      // ✅ عرض تأكيد قبل الحذف
      Swal.fire({
        title: `<strong>Remove "${item.productName}"?</strong>`,
        html: `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <p style="margin: 10px 0;">Quantity is 1. Removing will delete the item from cart.</p>
          <img src="${item.imageUrl}" alt="${item.productName}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.2);" />
        </div>
      `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
        width: 400,
        padding: '1.5rem',
      }).then((result) => {
        if (result.isConfirmed) {
          this.cartService.DecrementQuantity(productId).subscribe({
            next: () => {
              this.cart.items = this.cart.items.filter(
                (i) => i.productId !== productId
              );
              Swal.fire({
                icon: 'info',
                title: 'Item Removed',
                text: `${item.productName} removed from cart.`,
                toast: true,
                position: 'top-end',
                timer: 2000,
                showConfirmButton: false,
              });
            },
            error: (err) => {
              console.error('❌ Error while removing:', err);
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Could not remove item from cart.',
                toast: true,
                position: 'top-end',
                timer: 2500,
                showConfirmButton: false,
              });
            },
          });
        }
      });
    } else {
      // ✅ تقليل مباشر بدون تأكيد
      this.cartService.DecrementQuantity(productId).subscribe({
        next: () => {
          item.quantity -= 1;
          Swal.fire({
            icon: 'success',
            title: 'Quantity Updated',
            text: `Quantity of ${item.productName} updated to ${item.quantity}.`,
            toast: true,
            position: 'top-end',
            timer: 1500,
            showConfirmButton: false,
          });
        },
        error: (err) => {
          console.error('❌ Failed to decrement quantity:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Could not decrement quantity.',
            toast: true,
            position: 'top-end',
            timer: 2500,
            showConfirmButton: false,
          });
        },
      });
    }
  }

  increment(productId: number) {
    this.cartService.IncrementQuantity(productId).subscribe({
      next: (res) => {
        console.log('✅ Quantity incremented successfully:', res);
        const item = this.cart.items.find((i) => i.productId === productId);
        if (item) item.quantity += 1;

        Swal.fire({
          icon: 'success',
          title: 'Quantity Updated',
          text: 'Product quantity increased.',
          toast: true,
          position: 'top-end',
          timer: 1500,
          showConfirmButton: false,
        });
      },
      error: (err) => {
        console.error('❌ Failed to increment quantity:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Could not increment quantity.',
          toast: true,
          position: 'top-end',
          timer: 2500,
          showConfirmButton: false,
        });
      },
    });
  }

  clearCart(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will remove all items from your cart!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      width: 400,
      padding: '1.5rem',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearCart().subscribe({
          next: (res) => {
            console.log('✅ Cart cleared successfully:', res);
            this.cart.items = [];

            Swal.fire({
              icon: 'success',
              title: 'Cart Cleared',
              text: 'Your cart is now empty.',
              toast: true,
              position: 'top-end',
              timer: 2000,
              showConfirmButton: false,
            });
          },
          error: (err) => {
            console.error('❌ Failed to clear cart:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Failed to clear the cart.',
              toast: true,
              position: 'top-end',
              timer: 2500,
              showConfirmButton: false,
            });
          },
        });
      } else {
        // المستخدم لغى العملية
        Swal.fire({
          icon: 'info',
          title: 'Cancelled',
          text: 'Your cart is safe.',
          toast: true,
          position: 'top-end',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  }
} 
