import { TestBed } from '@angular/core/testing';

import { StockAdjustmentService } from './stock-adjustment.service';

describe('StockAdjustmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockAdjustmentService = TestBed.get(StockAdjustmentService);
    expect(service).toBeTruthy();
  });
});
