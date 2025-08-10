import {
  Component,
  EventEmitter,
  NgModule,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatFormField,
  MatFormFieldModule,
  MatPrefix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../../services/public/cart.service';
import { Observable } from 'rxjs';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { ProductService } from '../../../services/public/product.service';
import { Cart } from '../../../models/cart';
import { Product } from '../../../models/product';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [
    MatMenuModule,
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    MatIcon,
    MatInputModule,
    MatFormFieldModule,
    MatButton,
    MatIconButton,
    RouterOutlet,
    FormsModule,
    MatBadgeModule,
    AsyncPipe,
    MatMenuModule,
    DecimalPipe,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService,
  ) {}

  searchControl = new FormControl('');
  totalCount$ = new Observable<number>();
  totalSum$ = new Observable<number>();
  cart$ = new Observable<Cart>();

  ngOnInit(): void {
    this.totalCount$ = this.cartService.totalCount$;
    this.totalSum$ = this.cartService.totalSum$;
    this.cart$ = this.cartService.cart$;
  }

  onSearch() {
    const value = this.searchControl.value;
    if (value !== null && value.trim() !== '') {
      this.router.navigate(['/products'], { queryParams: { search: value } });
    }
  }

  getImageUrl(imagePath: string | undefined): string {
    if (imagePath) {
      return this.productService.getImageUrl(imagePath);
    } else {
      return '';
    }
  }

  calculateSum(quantity: number, product?: Product): number {
    if (product) {
      return quantity * product.price;
    } else {
      return 0;
    }
  }

  closeCartMenu() {
    this.menuTrigger.closeMenu();
  }

  shouldOpenCartMenu(): boolean {
    const cart = this.cartService.getCart();
    return cart && cart.cartItems && cart.cartItems.length > 0;
  }

  goToCart() {
    this.closeCartMenu();
    this.router.navigate(['/cart']);
  }

  userIsLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logOut() {
    this.cartService.onLogOut();
    this.authService.logOut();
    // cart aktualisieren??
  }
}
