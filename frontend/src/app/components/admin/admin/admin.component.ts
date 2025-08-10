import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../services/auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatButton,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSignOut(): void {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  openDashBoard(): void {
    this.router.navigate(['/admin']);
  }

  openProducts(): void {
    this.router.navigate(['/admin/products']);
  }

  openCategories() {
    this.router.navigate(['/admin/categories']);
  }
}
