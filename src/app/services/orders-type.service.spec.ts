import { TestBed } from '@angular/core/testing';

import { OrdersTypeService } from './orders-type.service';

describe('OrdersTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersTypeService = TestBed.get(OrdersTypeService);
    expect(service).toBeTruthy();
  });
});
