import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-register',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, MatButton],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  signUpForm!: FormGroup;

  usernameIsTaken = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(8)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^\+?\d{1,4}[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}$/,
            ),
          ],
        ],
      },
      { validators: [RegisterComponent.confirmPassword()] },
    );

    this.signUpForm
      .get('username')
      ?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((username) => this.authService.checkUsername(username)),
      )
      .subscribe((isTaken) => {
        this.usernameIsTaken = isTaken;
      });
  }

  signUp() {
    if (this.signUpForm.invalid) return;

    const user: User = {
      username: this.signUpForm.get('username')?.value,
      password: this.signUpForm.get('password')?.value,
      email: this.signUpForm.get('email')?.value,
      phoneNumber: this.signUpForm.get('phone')?.value,
    };

    this.authService.register(user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        alert('Registration successful!');
      },
      error: (err) => {
        console.error(err);
        this.usernameIsTaken = true;
      },
    });
  }

  static confirmPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if (!password || !confirmPassword) return null;

      return password === confirmPassword ? null : { PasswordNoMatch: true };
    };
  }
}
