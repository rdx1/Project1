import { TestBed } from '@angular/core/testing';

import { NominationviewService } from './nominationview.service';

describe('NominationviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NominationviewService = TestBed.get(NominationviewService);
    expect(service).toBeTruthy();
  });
});
