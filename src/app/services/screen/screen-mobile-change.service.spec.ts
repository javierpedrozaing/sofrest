import { TestBed } from '@angular/core/testing';

import { ScreenMobileChangeService } from './screen-mobile-change.service';

describe('ScreenChangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScreenMobileChangeService = TestBed.get(ScreenMobileChangeService);
    expect(service).toBeTruthy();
  });
});
