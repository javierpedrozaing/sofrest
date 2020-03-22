import { TestBed } from '@angular/core/testing';

import { ModifierService } from './modifier.service';

describe('ModifierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModifierService = TestBed.get(ModifierService);
    expect(service).toBeTruthy();
  });
});
