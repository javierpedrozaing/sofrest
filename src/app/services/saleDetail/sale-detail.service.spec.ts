import { TestBed } from '@angular/core/testing';

import { SaleDetailService } from './sale-detail.service';

describe('SaleDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaleDetailService = TestBed.get(SaleDetailService);
    expect(service).toBeTruthy();
  });
});
