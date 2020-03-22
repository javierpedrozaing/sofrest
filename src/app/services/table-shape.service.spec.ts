import { TestBed } from '@angular/core/testing';

import { TableShapeService } from './table-shape.service';

describe('TableShapeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableShapeService = TestBed.get(TableShapeService);
    expect(service).toBeTruthy();
  });
});
