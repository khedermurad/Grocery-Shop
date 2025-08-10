import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/admin/categories';

  constructor(private http: HttpClient) {}

  getCategoryList(name?: string): Observable<Category[]> {
    const url = name ? `${this.baseUrl}?name_like=${name}` : this.baseUrl;
    return this.http.get<Category[]>(url);
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }

  createCategory(category: Category): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}`, category);
  }
}
