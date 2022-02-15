import { TestBed } from '@angular/core/testing';

import { SavolService } from './savol.service';

describe('SavolService', () => {
  let service: SavolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
