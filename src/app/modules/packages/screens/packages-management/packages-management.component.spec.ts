import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesManagementComponent } from './packages-management.component';

describe('PackagesManagementComponent', () => {
  let component: PackagesManagementComponent;
  let fixture: ComponentFixture<PackagesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagesManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
