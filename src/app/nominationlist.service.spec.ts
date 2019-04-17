import { TestBed } from '@angular/core/testing';

import { NominationlistService } from './nominationlist.service';

describe('NominationlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NominationlistService = TestBed.get(NominationlistService);
    expect(service).toBeTruthy();
  });
});
