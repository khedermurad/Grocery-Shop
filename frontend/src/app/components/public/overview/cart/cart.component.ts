import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CartService } from '../../../../services/public/cart.service';
import { map, Observable } from 'rxjs';
import { ProductService } from '../../../../services/public/product.service';
import { Router } from '@angular/router';
import { Cart } from '../../../../models/cart';
import { CartItem } from '../../../../models/cart-item';

@Component({
  selector: 'app-cart',
  imports: [
    MatIcon,
    MatIconButton,
    DecimalPipe,
    AsyncPipe,
    MatButton,
    CommonModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  // TODO decrease or increase -> update price
  // if cart is empty?

  readonly SHIPPING_COSTS = 4.95;

  cart$ = new Observable<Cart>();
  totalCount$ = new Observable<number>();
  totalSum$ = new Observable<number>();
  cartTotal$ = new Observable<number>();

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.totalCount$ = this.cartService.totalCount$;
    this.totalSum$ = this.cartService.totalSum$;
    this.cartTotal$ = this.totalSum$.pipe(
      map((total) => total + this.SHIPPING_COSTS),
    );
  }

  decrease(cartItem: CartItem) {
    if (cartItem.quantity > 0) {
      this.cartService.updateQuantity(
        cartItem.product?.id!,
        cartItem.quantity - 1,
      );
    }
  }

  increase(cartItem: CartItem) {
    if (cartItem.product?.stockQuantity) {
      if (cartItem.product.stockQuantity >= cartItem.quantity + 1) {
        this.cartService.updateQuantity(
          cartItem.product?.id!,
          cartItem.quantity + 1,
        );
      }
    }
  }

  getImageUrl(imagePath: string | undefined): string {
    if (imagePath) {
      return this.productService.getImageUrl(imagePath);
    } else {
      return '';
    }
  }
  calculateProductPrice(cartItem: CartItem): number {
    if (cartItem.product?.price) {
      return cartItem.product?.price * cartItem.quantity;
    } else {
      return 0;
    }
  }

  goToDetail(id: number | undefined) {
    if (id) {
      this.router.navigate(['/products', id]);
    }
  }
}
