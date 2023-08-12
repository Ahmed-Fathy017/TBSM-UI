import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefrigeratorsManagementComponent } from './refrigerators-management.component';

describe('RefrigeratorsManagementComponent', () => {
  let component: RefrigeratorsManagementComponent;
  let fixture: ComponentFixture<RefrigeratorsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefrigeratorsManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefrigeratorsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
