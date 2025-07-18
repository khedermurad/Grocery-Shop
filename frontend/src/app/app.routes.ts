import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { adminChildGuard, adminGuard } from './guards/admin.guard';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ProductsComponent } from './components/admin/products/products.component';
import { EditProductComponent } from './components/admin/products/edit-product/edit-product.component';
import { CategoriesComponent } from './components/admin/categories/categories/categories.component';
import { HomeComponent } from './components/public/home/home.component';
import { OverviewComponent } from './components/public/overview/overview.component';
import { ProductListComponent } from './components/public/overview/product-list/product-list.component';
import { ProductDetailComponent } from './components/public/overview/product-detail/product-detail.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'access-denied', component: AccessDeniedComponent},
    {path: 'admin', 
        component: AdminComponent, 
        canActivate: [adminGuard], 
        canActivateChild: [adminChildGuard],
        children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'products', component: ProductsComponent},
            {path: 'edit-product', component: EditProductComponent},
            {path: 'categories', component: CategoriesComponent}
        ]},
    
    {path: '', component: HomeComponent,  data: {breadcrumb: 'Home'},
        children: [
            {path: '', component: OverviewComponent, pathMatch: 'full'},
            {path: 'products', component: ProductListComponent, data: {breadcrumb: 'Products'}, children: [
            ]},
            { path: 'products/:id', component: ProductDetailComponent, data: { breadcrumb: 'Detail' }}
        ]
    }

];
