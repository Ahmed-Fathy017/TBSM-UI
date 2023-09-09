import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySupplyRequestsManagementComponent } from './my-supply-requests-management.component';

describe('MySupplyRequestsManagementComponent', () => {
  let component: MySupplyRequestsManagementComponent;
  let fixture: ComponentFixture<MySupplyRequestsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySupplyRequestsManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySupplyRequestsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
