import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  signUpForm!: FormGroup;



  constructor(private fb: FormBuilder ){  }
  
  
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(8)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required]],
      phone: ["", [Validators.required, Validators.pattern(/^\+?\d{1,4}[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,4}$/)]]
    },
    {validators: [RegisterComponent.confirmPassword()]}) ;

    

  }




  signUp(){
    if(this.signUpForm.invalid) return;


  }


  static confirmPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if(!password || !confirmPassword) return null;

      return password === confirmPassword ? null : { PasswordNoMatch: true };
    };
  }


}
