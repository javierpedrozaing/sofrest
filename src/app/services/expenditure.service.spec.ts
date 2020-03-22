import { TestBed } from '@angular/core/testing';

import { ExpenditureService } from './expenditure.service';

describe('ExpenditureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpenditureService = TestBed.get(ExpenditureService);
    expect(service).toBeTruthy();
  });
});
