import { TestBed } from '@angular/core/testing';

import { GlobalCallService } from './global-call.service';

describe('GlobalCallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalCallService = TestBed.get(GlobalCallService);
    expect(service).toBeTruthy();
  });
});
