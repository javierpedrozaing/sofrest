import { TestBed } from '@angular/core/testing';

import { DishDetailService } from './dish-detail.service';

describe('DishDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DishDetailService = TestBed.get(DishDetailService);
    expect(service).toBeTruthy();
  });
});
