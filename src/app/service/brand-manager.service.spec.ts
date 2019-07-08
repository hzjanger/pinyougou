import { TestBed } from '@angular/core/testing';

import { BrandManagerService } from './brand-manager.service';

describe('BrandManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrandManagerService = TestBed.get(BrandManagerService);
    expect(service).toBeTruthy();
  });
});
