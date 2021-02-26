import { TestBed } from '@angular/core/testing';

import { AteliercrudService } from './ateliercrud.service';

describe('AteliercrudService', () => {
  let service: AteliercrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AteliercrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
