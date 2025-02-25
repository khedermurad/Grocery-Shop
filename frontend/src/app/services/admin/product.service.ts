import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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


}
