import { TestBed } from '@angular/core/testing';

import { RefrigeratorsService } from './refrigerators.service';

describe('RefrigeratorsService', () => {
  let service: RefrigeratorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefrigeratorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
