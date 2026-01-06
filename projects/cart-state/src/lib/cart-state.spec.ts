import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartState } from './cart-state';

describe('CartState', () => {
  let component: CartState;
  let fixture: ComponentFixture<CartState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartState]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartState);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
