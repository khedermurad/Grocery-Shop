import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Cart } from '../../models/cart';
import { Product } from '../../models/product';
import { CartItem } from '../../models/cart-item';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private storageKey = 'shoppingCart';
  private cartSubject = new BehaviorSubject<Cart>(this.loadCart());
  cart$ = this.cartSubject.asObservable();
  totalCount$ = this.cart$.pipe(
  map(cart => (cart?.cartItems ?? []).reduce((sum, item) => sum + item.quantity, 0))
);

totalSum$ = this.cart$.pipe(
  map(cart =>
    (cart?.cartItems ?? []).reduce(
      (sum, item) => sum + item.quantity * (item.product?.price ?? 0),
      0
    )
  )
);

private baseUrl = 'http://localhost:8080/api/user/cart';


  constructor(private authService: AuthService, private http: HttpClient) { }

  private loadCart(): Cart {
  try {
    const cart = JSON.parse(localStorage.getItem(this.storageKey) || '');
    if (cart && Array.isArray(cart.cartItems)) {
      return cart;
    }
  } catch (e) {
    console.log(e);
    
  }
  return { cartItems: [] };
  }

  private saveCart(cart: Cart): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
    this.cartSubject.next(cart); 
  }

  getCart(): Cart {
    return this.cartSubject.getValue();
  }

  addToCart(product: Product, quantity: number): void {
    if(this.authService.isLoggedIn()){
      this.addItemToCart(product, quantity).subscribe(
        {
          next: (updatedCart) => {
            this.cartSubject.next(updatedCart);
        },
        error: (err) => console.error(err)
        }
      );
      
    }else{
      const cart = this.getCart();
      const existing = cart.cartItems.find(item => item.product?.id === product.id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.cartItems.push({quantity, product: product });
      }
      this.saveCart(cart);
    }
  }

  removeOneFromCart(productId: number): void {
    if(this.authService.isLoggedIn()){
      this.removeItemFromCart(productId).subscribe({
      next: (updatedCart) => {
        this.cartSubject.next(updatedCart);
      },
      error: (err) => console.error(err)
    });
    }
    else{
      const cart = this.getCart();

      cart.cartItems = cart.cartItems
        .map(item =>
          item.product?.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);
        
        this.saveCart(cart);
      }
  }
  
  updateQuantity(productId: number, quantity: number): void{
  if (this.authService.isLoggedIn()) {
    this.updateItemQuantity(productId, quantity).subscribe({
      next: updatedCart => this.cartSubject.next(updatedCart),
      error: err => console.error(err)
    });
  } else {
    const cart = this.getCart();

    cart.cartItems = cart.cartItems.map(item => {
      if (item.product?.id === productId) {
        return { ...item, quantity };
      }
      return item;
    }).filter(item => item.quantity > 0);

    this.saveCart(cart);
  }
  }

  getCartProduct(productId: number): CartItem | undefined {
    return this.getCart().cartItems.find(item => item.product?.id === productId);
  }

  clearCart(): void {
    localStorage.removeItem(this.storageKey);
    this.saveCart({cartItems: []});
  }

  //// sync methods

  onLogin() {
  if (this.authService.isLoggedIn()) {
    this.getUserCart().subscribe({
      next: (response) => {
        if (response.status === 204) {
          this.saveUserCart(this.getCart()).subscribe(
            {
              next: (res) => {
                this.clearCart();
                this.cartSubject.next(res);
              },
              error: (err) => console.error('Fehler:', err)
            }
          )
        } 
        else {
          const cart = response.body;

          const mergedCart = this.mergeCarts(this.getCart(), cart!);

          this.updateUserCart(mergedCart).subscribe({
            next: (res) => {
              this.clearCart();
              this.cartSubject.next(res);
            },
            error: (err) => console.log(err)
          });

        }
      },
      error: (err) => 
        console.log(err)
    });
  }
}

  onLogOut(){
    this.clearCart();
    const localCart = this.loadCart();
    this.cartSubject.next(localCart);
  }

  getUserCart(): Observable<HttpResponse<Cart>> {
  return this.http.get<Cart>(`${this.baseUrl}`, { observe: 'response' });
  }

  saveUserCart(cart: Cart): Observable<Cart>{
    return this.http.post<Cart>(`${this.baseUrl}`, cart);
  }

  updateUserCart(cart: Cart): Observable<Cart>{
    return this.http.put<Cart>(`${this.baseUrl}`, cart);
  }


  addItemToCart(product: Product, quantity: number): Observable<Cart> {
  return this.http.post<Cart>(`${this.baseUrl}/add-item`, null, {
    params: {
      productId: product.id!,
      quantity: quantity
    }
  });
  }

  removeItemFromCart(productId: number): Observable<Cart>{
    return this.http.post<Cart>(`${this.baseUrl}/remove-item`, null, {
      params: { productId: productId}
    })
  }

  updateItemQuantity(productId: number, quantity: number): Observable<Cart> {
  return this.http.post<Cart>(`${this.baseUrl}/update-item`, null, {
    params: {
      productId: productId,
      quantity: quantity
    }
  });
}

mergeCarts(cart1: Cart, cart2: Cart): Cart {
  const mergedCartItems: CartItem[] = [...cart1.cartItems];

  for (const item2 of cart2.cartItems) {
    const existingItem = mergedCartItems.find(
      item1 => item1.product?.id === item2.product?.id
    );

    if (existingItem) {
      existingItem.quantity += item2.quantity;
    } else {
      mergedCartItems.push({ ...item2 });
    }
  }

  return {
    id: cart1.id ?? cart2.id,
    cartItems: mergedCartItems
  };
}


}
