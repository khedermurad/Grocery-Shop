import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../services/auth/auth.service';
@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [RouterModule, MatSidenavModule, MatIconModule, MatListModule, MatButtonModule, MatToolbarModule, MatMenuModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private authService: AuthService, private router: Router){}


  onSignOut(): void{
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  openDashBoard(): void{
    this.router.navigate(['/admin']);
  }

  openProducts(): void{
    this.router.navigate(['/admin/products'])
  }

}
