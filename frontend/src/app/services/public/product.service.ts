import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedProductResponse } from '../../models/paginated-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/public/products';

  constructor(private http: HttpClient) { }


  getProductsByCategory(categoryId: number, page: number, size: number): Observable<PaginatedProductResponse>{
    return this.http.get<PaginatedProductResponse>(`${this.baseUrl}/by-category?category_id=${categoryId}&page=${page}&size=${size}`);
  }


  getProducts(page: number, size: number, keyword?: string, 
    categoryId?: number, minPrice?: number, 
    maxPrice?: number): Observable<PaginatedProductResponse>{
    let url = `${this.baseUrl}/search?page=${page}&size=${size}`;

    if (keyword) {
      url += `&query=${encodeURIComponent(keyword)}`;
    }
    if(categoryId != null){
      url += `&categoryId=${encodeURIComponent(categoryId)}`
    }
    if(minPrice != null){
      url += `&minPrice=${encodeURIComponent(minPrice)}`
    }
    if(maxPrice != null){
      url += `&maxPrice=${encodeURIComponent(maxPrice)}`
    }
  
    return this.http.get<PaginatedProductResponse>(url);
  }

  getImage(imagePath: string): Observable<Blob>{
    return this.http.get(`${this.baseUrl}/image/${imagePath.replace(/^\/?uploads\//, '')}`, {responseType: 'blob'});
  }



}
