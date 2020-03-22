import { TestBed } from '@angular/core/testing';

import { DishCategoryService } from './dish-category.service';

describe('DishCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DishCategoryService = TestBed.get(DishCategoryService);
    expect(service).toBeTruthy();
  });
});
