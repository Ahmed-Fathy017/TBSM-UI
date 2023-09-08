import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationLogsComponent } from './operation-logs.component';

describe('OperationLogsComponent', () => {
  let component: OperationLogsComponent;
  let fixture: ComponentFixture<OperationLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationLogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
