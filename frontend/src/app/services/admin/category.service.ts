import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryView } from '../../models/category-view';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8080/api/admin/categories';

  constructor(private http: HttpClient) { }


  getCategoryList(): Observable<CategoryView[]>{
    return this.http.get<CategoryView[]>(`${this.baseUrl}`);
  }


}
