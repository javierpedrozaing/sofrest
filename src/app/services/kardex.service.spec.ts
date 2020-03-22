import { TestBed } from '@angular/core/testing';

import { KardexService } from './kardex.service';

describe('KardexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KardexService = TestBed.get(KardexService);
    expect(service).toBeTruthy();
  });
});
