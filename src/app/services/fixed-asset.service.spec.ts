import { TestBed } from '@angular/core/testing';

import { FixedAssetService } from './fixed-asset.service';

describe('FixedAssetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FixedAssetService = TestBed.get(FixedAssetService);
    expect(service).toBeTruthy();
  });
});
