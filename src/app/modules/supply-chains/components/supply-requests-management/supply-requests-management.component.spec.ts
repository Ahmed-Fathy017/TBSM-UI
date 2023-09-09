import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyRequestsManagementComponent } from './supply-requests-management.component';

describe('SupplyRequestsManagementComponent', () => {
  let component: SupplyRequestsManagementComponent;
  let fixture: ComponentFixture<SupplyRequestsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplyRequestsManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplyRequestsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
