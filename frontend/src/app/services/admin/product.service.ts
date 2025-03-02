import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/admin/products';

  constructor(private http: HttpClient) { }


  uploadImage(file: File): Observable<{imageUrl: string}>{
    const formData = new FormData();

    formData.append('file', file);
    
    return this.http.post<{imageUrl: string}>(`${this.baseUrl}/image`, formData);
  }

  deleteImage(url: string): Observable<string>{
    return this.http.delete<string>(`${this.baseUrl}/image`, {params: {imageUrl: url}});
  }

  createProduct(product: Product): Observable<string>{
    return this.http.post<string>(`${this.baseUrl}`, product);
  }

  getProducts(name?: string): Observable<Product[]>{
    const url = name ? `${this.baseUrl}?name_like=${name}` : this.baseUrl;
    return this.http.get<Product[]>(url);
  }

  getImageUrl(imagePath: string): Observable<Blob>{
    return this.http.get(`${this.baseUrl}/image/${imagePath.replace(/^\/?uploads\//, '')}`, {responseType: 'blob'});
  }

  deleteProduct(id: number): Observable<String>{
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }


}
