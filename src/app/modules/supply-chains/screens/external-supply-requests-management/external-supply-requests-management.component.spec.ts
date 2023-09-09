import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalSupplyRequestsManagementComponent } from './external-supply-requests-management.component';

describe('ExternalSupplyRequestsManagementComponent', () => {
  let component: ExternalSupplyRequestsManagementComponent;
  let fixture: ComponentFixture<ExternalSupplyRequestsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalSupplyRequestsManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalSupplyRequestsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
