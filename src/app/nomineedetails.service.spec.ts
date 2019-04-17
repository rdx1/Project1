import { TestBed } from '@angular/core/testing';

import { NomineedetailsService } from './nomineedetails.service';

describe('NomineedetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NomineedetailsService = TestBed.get(NomineedetailsService);
    expect(service).toBeTruthy();
  });
});
