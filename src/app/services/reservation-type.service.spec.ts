import { TestBed } from '@angular/core/testing';

import { ReservationTypeService } from './reservation-type.service';

describe('ReservationTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReservationTypeService = TestBed.get(ReservationTypeService);
    expect(service).toBeTruthy();
  });
});
