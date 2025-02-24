import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {


  productForm!: FormGroup;

  categories = ['Electronics', 'Clothing', 'Books'];

  constructor(private fb: FormBuilder){}


  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      price: ["", [Validators.required, Validators.min(0.01)]],
      category: ["", [Validators.required]],
      stockQuantity: ["", [Validators.required, Validators.min(0)]],
      imageUrl: ["", [Validators.required]]
    });
  }



  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    console.log('Bild ausgewählt:', file);
  }
  }

  addProduct() {
    
  }

}
