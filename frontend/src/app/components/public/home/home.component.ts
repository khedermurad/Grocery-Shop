import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input'; 
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [MatMenuModule, MatToolbarModule, 
    RouterLink, RouterLinkActive, ReactiveFormsModule,
    MatIcon, MatInputModule, MatFormFieldModule, MatButton, MatIconButton,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  onSearchSubmit() {
  throw new Error('Method not implemented.');
  }

  searchForm!: FormGroup;

}
