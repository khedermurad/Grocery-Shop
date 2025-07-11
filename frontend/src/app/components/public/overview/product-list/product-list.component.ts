import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/public/product.service';
import { Product } from '../../../../models/product';
import { CategoryService } from '../../../../services/public/category.service';
import { Category } from '../../../../models/category';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { BreadcrumbComponent } from "../../home/breadcrumb/breadcrumb.component";
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject } from 'rxjs';



interface ProductFilter {
  search?: string;
  category?: number;
  minPrice?: number;
  maxPrice?: number;
}

@Component({
  selector: 'app-product-list',
  imports: [MatTabsModule, FormsModule, MatRadioModule,
    MatCardModule, MatIcon, MatIconButton, MatButton, 
    MatMenu, MatMenuTrigger, MatMenuModule,
  BreadcrumbComponent, MatFormField, MatLabel, MatInputModule], 
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  [x: string]: any;
  isBrandMenuOpen = false;
  isCategoryMenuOpen = false;
  isPriceMenuOpen = false;
  isSortByMenuOpen = false;

  private filters$ = new BehaviorSubject<ProductFilter>({})


  private pageSize = 18;
  private currentPage = 0;
  private currentCategory?: number;
  lastPage: boolean = false;
  imageUrlMap: Map<String, String> = new Map();
  products: Product[] = [];
  categories: Category[] = [];
  minPrice?: number;
  maxPrice?: number;
  search?: string = '';

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router
  ){}

  // TODOS
  // alle filter entfernen
  // was machen mit category und search? vielleicht nur preis entfernen


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const filters: ProductFilter = {
        category: params['category'] ? +params['category'] : undefined,
        minPrice: params['minPrice'] ? +params['minPrice'] : undefined,
        maxPrice: params['maxPrice'] ? +params['maxPrice'] : undefined,
        search: params['search']
      }
      
      this.filters$.next(filters);
    });

    this.filters$.subscribe(filters => {
      this.search = filters.search ;
      this.currentCategory = filters.category;
      this.minPrice = filters.minPrice;
      this.maxPrice = filters.maxPrice;
      this.currentPage = 0;
      this.products = [];

      this.loadCategories();

      this.loadProducts({
      keyword: filters.search,
      categoryId: filters.category,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      page: 0
    });
    });
  }


  private loadProducts(options: {
    keyword?: string,
    categoryId?: number,
    minPrice?: number, 
    maxPrice?: number, 
    page?: number
  } = {}) {
    const { keyword, categoryId, minPrice, maxPrice, page = 0 } = options;
    const safeMinPrice = typeof minPrice === 'number' && !isNaN(minPrice) ? minPrice : undefined;
    const safeMaxPrice = typeof maxPrice === 'number' && !isNaN(maxPrice) ? maxPrice : undefined;
  
    if (page === 0) {
      this.products = [];
    }
  
    this.productService.getProducts(page, this.pageSize, keyword, categoryId, safeMinPrice, safeMaxPrice).subscribe({
      next: response => {
        response.content.forEach(product => {
          this.products.push(product);
        });
  
        this.lastPage = response.last;
        this.currentPage = response.number;
  
        this.loadImagesForProducts(this.products);
      },
      error: err => {
        console.log(err)
      }
    });
  }

  updateFilters(partial: Partial<ProductFilter>) {
  const current = this.filters$.value;
  const updated = { ...current, ...partial };

  this.router.navigate([], {
    relativeTo: this.route,
    queryParams: updated,
    queryParamsHandling: 'merge',
  });
}

  private loadCategories(){
    this.categoryService.getCategoryList().subscribe({
      next: response => {        
        this.categories = response;        
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  showMore() {
    this.loadProducts({categoryId: this.currentCategory, page: this.currentPage+1, keyword: this.search});
  }

  onCategoryChange(index: number) {
    const category = this.categories[index].id;
    this.updateFilters({category});
  }

  applyPriceRange() {
    this.updateFilters({minPrice: this.minPrice, maxPrice: this.maxPrice});
  }

  private loadImagesForProducts(products: Product[]) {
  for (const product of products) {
    if (!this.imageUrlMap.has(product.imageUrl)) {
      this.productService.getImage(product.imageUrl).subscribe({
        next: blob => {
          const reader = new FileReader();
          reader.onload = () => {
            this.imageUrlMap.set(product.imageUrl, reader.result as string);
          };
          reader.readAsDataURL(blob);
        },
        error: err => console.log(err)
      });
    }
  }
}
  


}
