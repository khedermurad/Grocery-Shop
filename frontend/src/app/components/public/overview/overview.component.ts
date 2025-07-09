import { Component } from '@angular/core';
import { CategoriesComponent } from './categories/categories.component';
import { BreadcrumbComponent } from "../home/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-overview',
  imports: [CategoriesComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

}
