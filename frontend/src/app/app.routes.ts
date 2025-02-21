import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent},
    {path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [adminGuard]},
    {path: 'access-denied', component: AccessDeniedComponent}

];
