import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedMessagesComponent } from './shared-messages.component';

describe('SharedMessagesComponent', () => {
  let component: SharedMessagesComponent;
  let fixture: ComponentFixture<SharedMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
