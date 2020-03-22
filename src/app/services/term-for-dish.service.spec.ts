import { TestBed } from '@angular/core/testing';

import { TermForDishService } from './term-for-dish.service';

describe('TermForDishService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TermForDishService = TestBed.get(TermForDishService);
    expect(service).toBeTruthy();
  });
});
