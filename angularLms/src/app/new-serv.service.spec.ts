import { TestBed } from '@angular/core/testing';

import { NewServService } from './new-serv.service';

describe('NewServService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewServService = TestBed.get(NewServService);
    expect(service).toBeTruthy();
  });
});
