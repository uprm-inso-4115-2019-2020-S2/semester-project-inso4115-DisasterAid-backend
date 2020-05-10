import { TestBed } from '@angular/core/testing';

import { SeekDonationsService } from './seek-donations.service';

describe('SeekDonationsService', () => {
  let service: SeekDonationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeekDonationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
