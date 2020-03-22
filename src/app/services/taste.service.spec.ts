import { TestBed } from '@angular/core/testing';

import { TasteService } from './taste.service';

describe('TasteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TasteService = TestBed.get(TasteService);
    expect(service).toBeTruthy();
  });
});
