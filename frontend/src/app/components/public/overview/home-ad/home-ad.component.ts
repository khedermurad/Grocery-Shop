import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-ad',
  imports: [],
  templateUrl: './home-ad.component.html',
  styleUrl: './home-ad.component.scss'
})
export class HomeAdComponent {

  private readonly CATEGORY_ID = 11;

  constructor(private router: Router){}

  goToProducts(){
    this.router.navigate(['/products'], {queryParams: {category: this.CATEGORY_ID }})
  }

}
