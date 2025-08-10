import { Component } from '@angular/core';
import { CategoriesComponent } from './categories/categories.component';
import { BreadcrumbComponent } from '../home/breadcrumb/breadcrumb.component';
import { HomeAdComponent } from './home-ad/home-ad.component';

@Component({
  selector: 'app-overview',
  imports: [CategoriesComponent, HomeAdComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {}
