import { TestBed } from '@angular/core/testing';

import { RequestApiService } from './request-api.service';

describe('RequestApiService', () => {
  let service: RequestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
