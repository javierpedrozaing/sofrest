import { TestBed } from '@angular/core/testing';

import { CashOperationService } from './cash-operation.service';

describe('CashOperationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CashOperationService = TestBed.get(CashOperationService);
    expect(service).toBeTruthy();
  });
});
