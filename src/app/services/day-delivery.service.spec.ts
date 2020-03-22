import { TestBed } from '@angular/core/testing';

import { DayDeliveryService } from './day-delivery.service';

describe('DayDeliveryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DayDeliveryService = TestBed.get(DayDeliveryService);
    expect(service).toBeTruthy();
  });
});
