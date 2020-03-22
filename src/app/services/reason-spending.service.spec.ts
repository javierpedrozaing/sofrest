import { TestBed } from '@angular/core/testing';

import { ReasonSpendingService } from './reason-spending.service';

describe('ReasonSpendingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReasonSpendingService = TestBed.get(ReasonSpendingService);
    expect(service).toBeTruthy();
  });
});
