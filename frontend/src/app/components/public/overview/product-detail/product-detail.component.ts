import { Component, NgModule, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../home/breadcrumb/breadcrumb.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../services/public/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../../models/product';
import { DecimalPipe, SlicePipe } from '@angular/common';
import { DialogAddToCartComponent } from '../dialogs/dialog-add-to-cart/dialog-add-to-cart.component';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../../../services/public/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [
    BreadcrumbComponent,
    MatButton,
    MatIcon,
    FormsModule,
    MatIconButton,
    SlicePipe,
    DecimalPipe,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  quantity = 1;
  productId!: string;
  product?: Product;
  productImageUrl!: string;
  recommendedProducts?: Product[];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.productId = id;
        this.loadProductData(Number(id));
        this.quantity = 0;
      }
    });
  }

  private animationConfig = {
    enterAnimationDuration: '250ms',
    exitAnimationDuration: '250ms',
  };

  loadProductData(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (response) => {
        this.product = response;
        this.productImageUrl = this.productService.getImageUrl(
          this.product.imageUrl,
        );

        this.productService
          .getRandomProducts(this.product.category.id!, 4)
          .subscribe({
            next: (res) => (this.recommendedProducts = res),
            error: (err) => console.log(err),
          });
      },
      error: (err) => console.log(err),
    });
  }

  increase() {
    if (this.product?.stockQuantity! > this.quantity) {
      this.quantity++;
    }
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getImageUrl(imagePath: string): string {
    return this.productService.getImageUrl(imagePath);
  }

  goToDetail(id: number | undefined) {
    if (id) {
      this.router.navigate(['/products', id]);
    }
  }

  addToCart(product: Product, quantity: number) {
    const currentQuantity =
      this.cartService.getCartProduct(product.id!)?.quantity ?? 0;

    if (currentQuantity + quantity <= product.stockQuantity && quantity > 0) {
      this.cartService.addToCart(product, quantity);

      const dialogRef = this.dialog.open(DialogAddToCartComponent, {
        ...this.animationConfig,
        data: { product },
      });

      dialogRef.afterClosed().subscribe();
    } else {
    }
  }
}
