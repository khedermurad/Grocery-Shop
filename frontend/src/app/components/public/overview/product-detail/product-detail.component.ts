import { Component, NgModule, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../home/breadcrumb/breadcrumb.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../services/public/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../../models/product';
import { SlicePipe } from '@angular/common';


// TODOS - recommended products
// EURO TExt
// linie klein
// handling
// Breadcrumble + verschwindet
// 
//

@Component({
  selector: 'app-product-detail',
  imports: [BreadcrumbComponent, MatButton, MatIcon,FormsModule, MatIconButton, SlicePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  quantity = 1;
  productId!: string;
  product?: Product;
  productImageUrl!: string;
  recommendedProducts?: Product[];




  constructor(private productService: ProductService,
    private route: ActivatedRoute, private router: Router
  ){}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params =>{
      const id = params.get('id');
      if(id){
        this.productId = id;
        this.loadProductData(Number(id));
        this.quantity = 0;
      }
    })
  }

  loadProductData(id: number){
    this.productService.getProductById(id).subscribe({
    next: response => {
      this.product = response;
      this.productImageUrl = this.productService.getImageUrl(this.product.imageUrl);

      this.productService.getRandomProducts(this.product.category.id!, 4).subscribe({
        next: res => this.recommendedProducts = res,
        error: err => console.log(err)
      });
    },
    error: err => console.log(err)
  });
  }

  increase(){
    if(this.product?.stockQuantity!>this.quantity){
      this.quantity++;
    }
  }

  decrease(){
    if(this.quantity>1){
      this.quantity--;
    }
  }

  getImageUrl(imagePath: string): string{
    return this.productService.getImageUrl(imagePath);
  }

  
  goToDetail(id: number | undefined){
  if (id){
    this.router.navigate(['/products', id]);
  }
  }

}
