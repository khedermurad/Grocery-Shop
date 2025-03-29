import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/public/category.service';

@Component({
  selector: 'app-categories',
  imports: [MatCardModule, MatButton],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {


  categories: Category[] = [];

  visibleCount = 5;

  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {
    this.categoryService.getCategoryList().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (err) =>{
        console.log(err);
        
      }
    });
  }


  showMore() {
    this.visibleCount+= 5;
  }

}
