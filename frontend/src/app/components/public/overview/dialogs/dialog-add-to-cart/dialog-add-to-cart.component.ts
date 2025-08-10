import { Component, Inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Product } from '../../../../../models/product';
import { ProductService } from '../../../../../services/public/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-add-to-cart',
  imports: [MatIcon, MatIconButton, MatButton],
  templateUrl: './dialog-add-to-cart.component.html',
  styleUrl: './dialog-add-to-cart.component.scss',
})
export class DialogAddToCartComponent {
  product?: Product;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product: Product },
    private dialogRef: MatDialogRef<DialogAddToCartComponent>,
    private productService: ProductService,
    private router: Router,
  ) {
    this.product = this.data.product;
  }

  close() {
    this.dialogRef.close();
  }

  getImageUrl(imagePath?: string) {
    return this.productService.getImageUrl(imagePath!);
  }

  goToCart() {
    this.close();
    this.router.navigate(['/cart']);
  }
}
