import { TestBed } from '@angular/core/testing';

import { TypeAttributeService } from './type-attribute.service';

describe('TypeAttributeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeAttributeService = TestBed.get(TypeAttributeService);
    expect(service).toBeTruthy();
  });
});
