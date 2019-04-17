import { TestBed } from '@angular/core/testing';

import { TierserviceService } from './tierservice.service';

describe('TierserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TierserviceService = TestBed.get(TierserviceService);
    expect(service).toBeTruthy();
  });
});
