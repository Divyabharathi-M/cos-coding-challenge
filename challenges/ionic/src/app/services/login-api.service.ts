import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest, AuthenticationResult } from '../models/login.model';
export const BASE_URL='https://api-core-dev.caronsale.de/api/';
@Injectable({
  providedIn: 'root'
})
export class LoginApiService {
  authenticationUrl = 'v1/authentication/';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    ) { }

  isValidUser(userEmailId: string, authenticationRequest: AuthenticationRequest ) : Promise<AuthenticationResult | undefined> {

    const credentials = { password: authenticationRequest.password,
      meta: authenticationRequest.meta };
    return this.http.put<AuthenticationResult>(BASE_URL + this.authenticationUrl + userEmailId, credentials, this.authService.getHttpOptions()).toPromise();

  }
}
