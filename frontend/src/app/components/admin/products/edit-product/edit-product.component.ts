import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/admin/product.service';
import { Category } from '../../../../models/category';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../../models/product';
import { CategoryService } from '../../../../services/admin/category.service';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {


  readonly id!: number;

  categories!: Category[];
  productForm!: FormGroup;
  imageUrl: string | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  file: File | undefined;
  

  constructor(private route: ActivatedRoute, 
    private productService: ProductService, 
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ){
    this.id = Number(this.route.snapshot.queryParamMap.get('productId'));
  }


  ngOnInit(): void {

    this.loadCategories();

    this.productForm = this.fb.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      price: ["", [Validators.required, Validators.min(0.01)]],
      category: ["", [Validators.required]],
      stockQuantity: ["", [Validators.required, Validators.min(0)]],
      image: [null]
    });
    
    this.productService.getProduct(this.id).subscribe({
      next: (product: Product) => {

        console.log(product.category);

        this.imageUrl = product.imageUrl;
        

        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category.id,
          stockQuantity: product.stockQuantity,
          image: null
        });

        this.productService.getImageUrl(product.imageUrl).subscribe({
          next: (blob) => {
            const reader = new FileReader();
                reader.onload = () => {
                  this.imagePreview = reader.result as string;
                };
                reader.readAsDataURL(blob);
          },
          error: (err) => console.log(err)
          
        });


        
      },
      error: (err) => console.log(err)
    });
  }


  editProduct(){
    if(this.productForm.invalid) return;

    let  product: Product = {
      name: this.productForm.get('name')?.value,
      description: this.productForm.get('description')?.value,
      price: this.productForm.get('price')?.value,
      category: this.productForm.get('category')?.value,
      stockQuantity: this.productForm.get('stockQuantity')?.value,
      imageUrl: ""
    }

    if(this.productForm.get("image")?.value && this.file){

      if(this.imageUrl){
        this.productService.deleteImage(this.imageUrl).subscribe({
          next: (response) => {},
          error: (err) => console.log(err)
        });
      }

      this.productService.uploadImage(this.file).subscribe({
        next: (response) => {

          product.imageUrl = response.imageUrl ?? "";

          this.productService.updateProduct(this.id!, product).subscribe({
            next: (response) =>{
              console.log(response);
              this.cancelEdit();
            },
            error: (err) => console.log(err)            
          });
        },
        error: (err) => console.log(err)
      });
    }else{
      product.imageUrl = this.imageUrl ?? "";

      this.productService.updateProduct(this.id!, product).subscribe({
        next: (response) => {console.log(response);
          this.cancelEdit();
        },
        error: (err) => {console.log(err);
        }
      });
      
    }
    


  }

  onFileSelected(event: Event){
    const file = (event.target as HTMLInputElement).files?.[0];

    if(file){
      this.file = file;
      const reader = new FileReader();
      reader.onload = (e) =>{
        this.imagePreview = reader.result;
      }
      reader.readAsDataURL(file);
    }else{
    }
  }

  loadCategories(){
    this.categoryService.getCategoryList().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (err) => {console.log(err)}
    });
  }

  cancelEdit() {
    this.router.navigate(['/admin/products']);
  }



}
