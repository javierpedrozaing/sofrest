import { TestBed } from '@angular/core/testing';

import { TypeSaleService } from './type-sale.service';

describe('TypeSaleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeSaleService = TestBed.get(TypeSaleService);
    expect(service).toBeTruthy();
  });
});
