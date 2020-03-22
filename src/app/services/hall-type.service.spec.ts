import { TestBed } from '@angular/core/testing';

import { HallTypeService } from './hall-type.service';

describe('HallTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HallTypeService = TestBed.get(HallTypeService);
    expect(service).toBeTruthy();
  });
});
