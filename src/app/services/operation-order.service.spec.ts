import { TestBed } from '@angular/core/testing';

import { OperationOrderService } from './operation-order.service';

describe('OperationOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperationOrderService = TestBed.get(OperationOrderService);
    expect(service).toBeTruthy();
  });
});
