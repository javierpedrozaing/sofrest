import { TestBed } from '@angular/core/testing';

import { AttributeTypeDishService } from './attribute-type-dish.service';

describe('AttributeTypeDishService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttributeTypeDishService = TestBed.get(AttributeTypeDishService);
    expect(service).toBeTruthy();
  });
});
