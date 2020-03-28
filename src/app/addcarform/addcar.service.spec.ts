import { TestBed } from '@angular/core/testing';

import { AddcarService } from './addcar.service';

describe('AddcarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddcarService = TestBed.get(AddcarService);
    expect(service).toBeTruthy();
  });
});
