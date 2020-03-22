import { TestBed } from '@angular/core/testing';

import { ProductionAreaService } from './production-area.service';

describe('ProductionAreaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductionAreaService = TestBed.get(ProductionAreaService);
    expect(service).toBeTruthy();
  });
});
