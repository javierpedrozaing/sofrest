import { TestBed } from '@angular/core/testing';

import { CashMovementService } from './cash-movement.service';

describe('CashMovementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CashMovementService = TestBed.get(CashMovementService);
    expect(service).toBeTruthy();
  });
});
