import { TestBed } from '@angular/core/testing';

import { DashboradService } from './dashboard.service';

describe('DashboradService', () => {
  let service: DashboradService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboradService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
