import { TestBed } from '@angular/core/testing';

import { TelesignService } from './telesign.service';

describe('TelesignService', () => {
  let service: TelesignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelesignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
