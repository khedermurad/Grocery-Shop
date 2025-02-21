import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoginData } from '../../models/login-data';
import { AuthResponse } from '../../models/auth-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService){
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

        alert(this.authService.getUserRole());

      },
      error: (err) => {
        console.error(err);
        this.errorMessage = "Error logging in. Please check your entries or try again later.";
      }
    });

  }
  

}
