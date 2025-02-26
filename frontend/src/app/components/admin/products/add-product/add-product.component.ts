import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/admin/product.service';
import { Product } from '../../../../models/product';

@Component({
  selector: 'app-add-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {


  productForm!: FormGroup;
  imagePreview: string | null = null;
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  categories = ['Electronics', 'Clothing', 'Books'];

  constructor(private fb: FormBuilder, private productService: ProductService){}


  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      price: ["", [Validators.required, Validators.min(0.01)]],
      category: ["", [Validators.required]],
      stockQuantity: ["", [Validators.required, Validators.min(0)]],
      image: [null, [Validators.required]]
    });
  }



  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {    
      
      if(this.imageUrl){
        this.productService.deleteImage(this.imageUrl).subscribe({
          next: (data) => {},
          error: (err) => {
            console.log(err);
            
          }
        })
      }
      
      this.productService.uploadImage(file).subscribe({
        next: (response) => {
          this.imageUrl = response.imageUrl;
          this.imagePreview = null;
        },
        error: (error) => {
          console.error("Error uploading the image", error);
        }
      });
    }
  }

  // TODO when adding picture other fields are gone
  addProduct() {
    console.log("TEST");
    
    if(this.productForm.invalid) return;

    const product: Product = {
      name: this.productForm.get('name')?.value,
      description: this.productForm.get('description')?.value,
      price: this.productForm.get('price')?.value,
      category: this.productForm.get('category')?.value,
      stockQuantity: this.productForm.get('stockQuantity')?.value,
      imageUrl: this.imageUrl ?? ""
    }

    this.productService.createProduct(product).subscribe({
      next: (response) => {
        console.log(response);
        // route
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

}
