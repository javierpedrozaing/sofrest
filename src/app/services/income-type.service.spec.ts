import { TestBed } from '@angular/core/testing';

import { IncomeTypeService } from './income-type.service';

describe('IncomeTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IncomeTypeService = TestBed.get(IncomeTypeService);
    expect(service).toBeTruthy();
  });
});
