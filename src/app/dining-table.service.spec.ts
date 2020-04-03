import { TestBed } from '@angular/core/testing';

import { DiningTableService } from './dining-table.service';

describe('DiningTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiningTableService = TestBed.get(DiningTableService);
    expect(service).toBeTruthy();
  });
});
