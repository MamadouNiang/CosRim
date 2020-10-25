import { TestBed } from '@angular/core/testing';

import { AthGuardService } from './ath-guard.service';

describe('AthGuardService', () => {
  let service: AthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
