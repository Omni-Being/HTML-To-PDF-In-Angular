import { TestBed } from '@angular/core/testing';

import { FasServiceService } from './fas-service.service';

describe('FasServiceService', () => {
  let service: FasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
