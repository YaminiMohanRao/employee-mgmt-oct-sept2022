import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/auth/services/auth.service';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let httpTestingController: HttpTestingController,
    // Creating a mock for AuthService
    mockAuthSvc: any,
    httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
        {
          provide: AuthService,
          useValue: mockAuthSvc
        },
        AuthInterceptor
      ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });

  // testing whether the request has authorization header
  it('should set the authorization header when a request is made using http client', () => {
    // Expect that a single request has been made which matches the given URL, and return its mock.
    httpClient.get('https://jsonplaceholder.typicode.com/users').subscribe();
    let req = httpTestingController.expectOne(
      'https://jsonplaceholder.typicode.com/users'
    );

    /* Every test will make an HTTP request using httpClient and then flush the request using httpTestingController,
     so the request is completed and then the test will assert the behavior. */
    req.flush([]);
    expect(req.request.headers.get('authorization')).toBeDefined();
  });
});
