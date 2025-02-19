import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder){
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        username: ["", [Validators.required, Validators.minLength(8)]],
        password: ["", [Validators.required, Validators.minLength(8)]]
      }
    );
  }


  login(){
    if(this.loginForm.invalid) return;

    alert("Calling backend to login")
  }
  

}
