import { TestBed } from '@angular/core/testing';

import { MenuCategoryService } from './menu-category.service';

describe('MenuCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuCategoryService = TestBed.get(MenuCategoryService);
    expect(service).toBeTruthy();
  });
});
