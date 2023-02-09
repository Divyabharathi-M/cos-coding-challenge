import { AuthenticationService } from './authentication.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginApiService } from './login-api.service';
import { HttpClient } from '@angular/common/http';

describe('LoginApiService', () => {
  let loginApiService: LoginApiService;
  let http: HttpClient;
  let httpController: HttpTestingController;
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginApiService, AuthenticationService],
    });
    loginApiService = TestBed.inject(LoginApiService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    authenticationService = TestBed.inject(AuthenticationService);
  });

  it('login API service to be defined', () => {
    expect(loginApiService).toBeDefined();
  });

  it('authentication service to be defined', () => {
    expect(authenticationService).toBeDefined();
  });

  it('should be created', () => {
    expect(loginApiService).toBeTruthy();
  });
});
