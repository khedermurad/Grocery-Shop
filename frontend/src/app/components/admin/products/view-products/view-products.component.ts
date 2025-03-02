import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/admin/product.service';
import { Product } from '../../../../models/product';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogEditComponent } from '../dialogs/dialog-edit/dialog-edit.component';

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
  imageUrlMap: Map<string, string> = new Map();

  displayedColumns: string[] = ['name', 'description', 'price', 'category', 'stockQuantity', 'image']

  constructor(private productService: ProductService, 
    private fb: FormBuilder,
    private dialog: MatDialog){}


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

        this.products.forEach(product => {
          if(!this.imageUrlMap.has(product.imageUrl)){
            this.productService.getImageUrl(product.imageUrl).subscribe({
              next: (blob) => {
                const reader = new FileReader();
                reader.onload = () => {
                  this.imageUrlMap = new Map(this.imageUrlMap.set(product.imageUrl, reader.result as string));
                }
                reader.readAsDataURL(blob);
              },
              error: (err) => {
                console.log(err);
              }
            });
          }
          })
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

  openDialog(row: any) {
    const dialogRef = this.dialog.open(DialogEditComponent, {
      width: '250px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data:{
        id: row.id,
        name: row.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.success){
        this.fetchProducts();
      }
    });


  }

  



}


