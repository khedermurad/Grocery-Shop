import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { LoginData } from '../../../models/login-data';
import { AuthResponse } from '../../../models/auth-response';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, MatButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        username: ["", [Validators.required]],
        password: ["", [Validators.required, Validators.minLength(8)]]
      }
    );
  }


  login(){
    if(this.loginForm.invalid) return;

    const loginData: LoginData = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.authService.login(loginData).subscribe({
      next: (response: AuthResponse) => {
        this.authService.setToken(response.accessToken);

        const role = this.authService.getUserRole();

        if(role === 'ROLE_ROLE_ADMIN'){
          this.router.navigate(['/admin']);
        }else if(role == 'ROLE_ROLE_USER'){
          // TODO navigate to user dashboard
        }

      },
      error: (err) => {
        console.error(err);
        this.errorMessage = "Error logging in. Please check your entries or try again later.";
      }
    });

  }
  

}
