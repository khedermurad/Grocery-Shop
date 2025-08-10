import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/public/categories';

  constructor(private http: HttpClient) {}

  getCategoryList(name?: string): Observable<Category[]> {
    const url = name ? `${this.baseUrl}?name_like=${name}` : this.baseUrl;
    return this.http.get<Category[]>(url);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }
}
