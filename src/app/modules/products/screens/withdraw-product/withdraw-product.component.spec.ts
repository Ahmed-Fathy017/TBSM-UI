import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawProductComponent } from './withdraw-product.component';

describe('WithdrawProductComponent', () => {
  let component: WithdrawProductComponent;
  let fixture: ComponentFixture<WithdrawProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
