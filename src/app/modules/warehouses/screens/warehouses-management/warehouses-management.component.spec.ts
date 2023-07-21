import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousesManagementComponent } from './warehouses-management.component';

describe('WarehousesManagementComponent', () => {
  let component: WarehousesManagementComponent;
  let fixture: ComponentFixture<WarehousesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehousesManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehousesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
