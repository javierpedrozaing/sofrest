import { TestBed } from '@angular/core/testing';

import { DishAttributeService } from './dish-attribute.service';

describe('DishAttributeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DishAttributeService = TestBed.get(DishAttributeService);
    expect(service).toBeTruthy();
  });
});
