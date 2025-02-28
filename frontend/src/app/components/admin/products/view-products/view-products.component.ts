import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/admin/product.service';
import { Product } from '../../../../models/product';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-view-products',
  imports: [ReactiveFormsModule, CommonModule, MatTableModule],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css'
})
export class ViewProductsComponent implements OnInit{


  searchValue = '';
  products: Product[] = [];
  searchForm!: FormGroup;

  displayedColumns: string[] = ['name', 'description', 'price', 'category', 'stockQuantity', 'image']
  clickedRows = new Set<any>();

  constructor(private productService: ProductService, private fb: FormBuilder){}


  ngOnInit(): void {
    this.fetchProducts();

    this.searchForm = this.fb.group({
      searchValue: ''
    });
  }


  fetchProducts(): void{
    this.productService.getProducts(this.searchValue).subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSearchSubmit() {
    this.searchValue = this.searchForm.get('searchValue')?.value;
    this.fetchProducts();
  }

  loadImage(imagePath: string): string{
    return this.productService.getImageUrl(imagePath);
  }

  onRowClicked(row: any) {
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row);  
    } else {
      this.clickedRows.add(row); 
  }
}

}
