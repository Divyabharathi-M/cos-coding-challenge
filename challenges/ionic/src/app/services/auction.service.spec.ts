import { TestBed } from '@angular/core/testing';

import { AuctionService } from './auction.service';

describe('AuctionService', () => {
  let service: AuctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionService);
  });

  it('should be created', () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionService);
    expect(service).toBeTruthy();
  });
});
