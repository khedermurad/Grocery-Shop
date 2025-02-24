import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { AddProductComponent } from "./add-product/add-product.component";
import { ViewProductsComponent } from "./view-products/view-products.component";


@Component({
  selector: 'app-products',
  imports: [MatTabsModule, AddProductComponent, ViewProductsComponent, AddProductComponent, ViewProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
