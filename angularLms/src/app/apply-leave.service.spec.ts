import { TestBed } from '@angular/core/testing';

import { ApplyLeaveService } from './apply-leave.service';

describe('ApplyLeaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplyLeaveService = TestBed.get(ApplyLeaveService);
    expect(service).toBeTruthy();
  });
});
