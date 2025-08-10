import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/public/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [MatCardModule, MatButton],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  visibleCount = 5;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategoryList().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showMore() {
    this.visibleCount += 5;
  }

  onSelectCategory(categoryId: number) {
    this.router.navigate(['/products'], {
      queryParams: { category: categoryId },
    });
  }
}
