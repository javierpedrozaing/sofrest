import { TestBed } from '@angular/core/testing';

import { AdjustReasonService } from './adjust-reason.service';

describe('AdjustReasonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdjustReasonService = TestBed.get(AdjustReasonService);
    expect(service).toBeTruthy();
  });
});
