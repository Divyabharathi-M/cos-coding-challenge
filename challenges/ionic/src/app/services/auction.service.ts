import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from './login-api.service';
import { Observable } from 'rxjs';
import { BuyerAuctionsResponse } from '../models/buyer-auction.model';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  auctionBuyer = 'v2/auction/buyer/';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService) { }

  getAuctionsForBuyer(filter='dummy', count=false): Observable<BuyerAuctionsResponse> {
    const query = "?filter='" + filter + "'&count=" + count;
    return this.http.get<BuyerAuctionsResponse>(BASE_URL + this.auctionBuyer, this.authService.getAuthorisedHttpOptions());
  }
}
