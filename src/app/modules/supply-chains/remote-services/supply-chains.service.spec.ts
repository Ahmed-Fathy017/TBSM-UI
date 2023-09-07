import { TestBed } from '@angular/core/testing';

import { SupplyChainsService } from './supply-chains.service';

describe('SupplyChainsService', () => {
  let service: SupplyChainsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplyChainsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
