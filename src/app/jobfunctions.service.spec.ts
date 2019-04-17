import { TestBed } from '@angular/core/testing';

import { JobfunctionsService } from './jobfunctions.service';

describe('JobfunctionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobfunctionsService = TestBed.get(JobfunctionsService);
    expect(service).toBeTruthy();
  });
});
