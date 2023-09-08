import { TestBed } from '@angular/core/testing';

import { OperationLogsService } from './operation-logs.service';

describe('OperationLogsService', () => {
  let service: OperationLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
