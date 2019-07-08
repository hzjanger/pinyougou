import { TestBed } from '@angular/core/testing';

import { TypeTemplateService } from './type-template.service';

describe('TypeTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeTemplateService = TestBed.get(TypeTemplateService);
    expect(service).toBeTruthy();
  });
});
