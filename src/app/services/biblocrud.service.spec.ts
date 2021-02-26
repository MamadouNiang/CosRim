import { TestBed } from '@angular/core/testing';

import { BiblocrudService } from './biblocrud.service';

describe('BiblocrudService', () => {
  let service: BiblocrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiblocrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
