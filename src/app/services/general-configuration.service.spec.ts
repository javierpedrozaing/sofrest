import { TestBed } from '@angular/core/testing';

import { GeneralConfigurationService } from './general-configuration.service';

describe('GeneralConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralConfigurationService = TestBed.get(GeneralConfigurationService);
    expect(service).toBeTruthy();
  });
});
