import { TestBed } from '@angular/core/testing';

import { OfferTypeService } from './offer-type.service';

describe('OfferTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfferTypeService = TestBed.get(OfferTypeService);
    expect(service).toBeTruthy();
  });
});
