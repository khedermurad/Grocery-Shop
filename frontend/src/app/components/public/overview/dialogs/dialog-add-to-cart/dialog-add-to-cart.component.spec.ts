import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddToCartComponent } from './dialog-add-to-cart.component';

describe('DialogAddToCartComponent', () => {
  let component: DialogAddToCartComponent;
  let fixture: ComponentFixture<DialogAddToCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddToCartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogAddToCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
