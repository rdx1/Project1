import { TestBed } from '@angular/core/testing';

import { SearchdetailsService } from './searchdetails.service';

describe('SearchdetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchdetailsService = TestBed.get(SearchdetailsService);
    expect(service).toBeTruthy();
  });
});
