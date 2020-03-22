import { TestBed } from '@angular/core/testing';

import { TrademarkService } from './trademark.service';

describe('TrademarkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrademarkService = TestBed.get(TrademarkService);
    expect(service).toBeTruthy();
  });
});
