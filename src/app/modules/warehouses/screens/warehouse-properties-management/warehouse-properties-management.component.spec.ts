import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousePropertiesManagementComponent } from './warehouse-properties-management.component';

describe('WarehousePropertiesManagementComponent', () => {
  let component: WarehousePropertiesManagementComponent;
  let fixture: ComponentFixture<WarehousePropertiesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehousePropertiesManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehousePropertiesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
