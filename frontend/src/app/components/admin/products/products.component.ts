import { Component, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewProductsComponent } from './view-products/view-products.component';

@Component({
  selector: 'app-products',
  imports: [
    MatTabsModule,
    AddProductComponent,
    ViewProductsComponent,
    AddProductComponent,
    ViewProductsComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  @ViewChild(ViewProductsComponent)
  viewProductsComponent!: ViewProductsComponent;

  onProductAdded() {
    this.viewProductsComponent.fetchProducts();
  }
}
