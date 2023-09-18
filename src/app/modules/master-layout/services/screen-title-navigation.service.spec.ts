import { TestBed } from '@angular/core/testing';

import { ScreenTitleNavigationService } from './screen-title-navigation.service';

describe('ScreenTitleNavigationService', () => {
  let service: ScreenTitleNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenTitleNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
