import { TestBed } from '@angular/core/testing';

import { VoucherTypeService } from './voucher-type.service';

describe('VoucherTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VoucherTypeService = TestBed.get(VoucherTypeService);
    expect(service).toBeTruthy();
  });
});
