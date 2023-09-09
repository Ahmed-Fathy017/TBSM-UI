import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalSupplyRequestsManagementComponent } from './internal-supply-requests-management.component';

describe('InternalSupplyRequestsManagementComponent', () => {
  let component: InternalSupplyRequestsManagementComponent;
  let fixture: ComponentFixture<InternalSupplyRequestsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalSupplyRequestsManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalSupplyRequestsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
