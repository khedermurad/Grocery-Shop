import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/admin/product.service';
import { Product } from '../../../../models/product';
import { CategoryService } from '../../../../services/admin/category.service';
import { Category } from '../../../../models/category';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

  @Output() productAdded = new EventEmitter<void>();
  

  productForm!: FormGroup;
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  categories!: Category[];


  constructor(private fb: FormBuilder, 
    private productService: ProductService, 
    private categoryService: CategoryService,
    private router: Router){}


  ngOnInit(): void {

    this.loadCategories();

    this.productForm = this.fb.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      price: ["", [Validators.required, Validators.min(0.01)]],
      category: ["", [Validators.required]],
      stockQuantity: ["", [Validators.required, Validators.min(0)]],
      image: [null, [Validators.required]]
    });
  }


  loadCategories(){
    this.categoryService.getCategoryList().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (err) => {console.log(err)}
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
        },
        error: (error) => {
          console.error("Error uploading the image", error);
        }
      });
    }
  }


  addProduct() {

    if(this.productForm.invalid) return;

    const product: Product = {
      name: this.productForm.get('name')?.value,
      description: this.productForm.get('description')?.value,
      price: this.productForm.get('price')?.value,
      category: {id: this.productForm.get('category')?.value, 
                name: ""},
      stockQuantity: this.productForm.get('stockQuantity')?.value,
      imageUrl: this.imageUrl ?? ""
    }

    this.productService.createProduct(product).subscribe({
      next: (response) => {
        this.productForm.reset();
        this.imageUrl = null;
        this.productAdded.emit();
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

}
