import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input'; 
import { MatButton, MatIconButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [MatMenuModule, MatToolbarModule, 
    RouterLink, RouterLinkActive, ReactiveFormsModule,
    MatIcon, MatInputModule, MatFormFieldModule, MatButton, MatIconButton,
    RouterOutlet, FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  searchControl = new FormControl('');

  constructor(private router: Router){}

  ngOnInit(): void {
    /*
    this.searchControl.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(value => value !== null && value.trim() !== '')
    ).subscribe(value => {
      this.router.navigate(['/products/search'], {queryParams: {keyword: value}});
    });
    */
  }

  onSearch() {
    const value = this.searchControl.value;
    if(value !== null && value.trim() !== ''){
      this.router.navigate(['/products'], {queryParams: {search: value}});
    }
  }

}
