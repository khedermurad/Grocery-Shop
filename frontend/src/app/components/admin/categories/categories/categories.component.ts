import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '../../../../models/category';
import { MatTableModule } from '@angular/material/table';
import { CategoryService } from '../../../../services/admin/category.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-categories',
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTableModule,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  searchValue = '';
  categories: Category[] = [];
  searchForm!: FormGroup;
  displayedColumns: string[] = ['name', 'actions'];

  private animationConfig = {
    width: '300px',
    height: '120px',
    enterAnimationDuration: '250ms',
    exitAnimationDuration: '250ms',
    data: {} as { id?: number; name?: string; create?: boolean },
  };

  defaultAnimationConfig = { ...this.animationConfig };

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.fetchCategories();

    this.searchForm = this.fb.group({
      searchValue: '',
    });
  }

  fetchCategories() {
    this.categoryService.getCategoryList(this.searchValue).subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (err) => console.error(err),
    });
  }

  onCreate() {
    this.animationConfig.data = { create: true };

    const dialogRef = this.dialog.open(
      DialogEditComponent,
      this.animationConfig,
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.created) {
        this.fetchCategories();
      }
      this.animationConfig = { ...this.defaultAnimationConfig };
    });
  }

  onSearchSubmit() {
    this.searchValue = this.searchForm.get('searchValue')?.value;
    this.fetchCategories();
  }

  editCategory(category: Category) {
    this.animationConfig.data = {
      id: category.id,
      name: category.name,
      create: false,
    };

    const dialogRef = this.dialog.open(
      DialogEditComponent,
      this.animationConfig,
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.edited) {
        this.fetchCategories();
      }
      this.animationConfig = { ...this.defaultAnimationConfig };
    });
  }

  deleteCategory(category: Category) {
    this.animationConfig.data = { id: category.id, name: category.name };
    this.animationConfig.width = '400px';
    this.animationConfig.height = '180px';

    const dialogRef = this.dialog.open(
      DialogDeleteComponent,
      this.animationConfig,
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.deleted) {
        this.fetchCategories();
      }
      this.animationConfig = { ...this.defaultAnimationConfig };
    });
  }
}
