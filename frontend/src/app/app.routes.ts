import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { adminChildGuard, adminGuard } from './guards/admin.guard';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ProductsComponent } from './components/admin/products/products.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent},
    {path: 'access-denied', component: AccessDeniedComponent},
    {path: 'admin', 
        component: AdminComponent, 
        canActivate: [adminGuard], 
        canActivateChild: [adminChildGuard],
        children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'products', component: ProductsComponent}
        ]}

];
