import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { NavigationHelper } from 'src/app/shared/utils/navigation-helper';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  // set up spy
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let routerSpy: jasmine.SpyObj<NavigationHelper>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule]
    });
    service = TestBed.inject(AuthService);
  });

  // setting up spy
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new AuthService(httpClientSpy, routerSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // postive case for isAuth
  // it('should return true from isAuth when there is a token', () => {
  //   localStorage.setItem('authToken', '1234');
  //   expect(service.isAuth()).toBeTruthy();
  // });

  // negative case for isAuth
  // it('should return false from isAuth when there is no token', () => {
  //   localStorage.removeItem('authToken');
  //   expect(service.isAuth()).toBeFalsy();
  // });

  it('should register an user when called [HTTP SPY]', (done: DoneFn) => {
    // mock data for registering an user
    const signupUserMockReq = {
      email: 'eve.holt@reqres.in',
      password: 'Yamini03',
      confirmPassword: 'Yamini03'
    };

    const signupeUserMockRes = {
      id: '4',
      token: 'QpwL5tke4Pnpja7X4'
    };

    httpClientSpy.post.withArgs(environment.signupUsersApi, signupUserMockReq).and.returnValue(of(signupeUserMockRes));
    
    // passing mockReq thru service and expecting the mockRes
    service.signupUser(signupUserMockReq).subscribe({
      next: (res: any) => {
        expect(res).toEqual(signupeUserMockRes);
        done();
      },
      error: done.fail
    });
  });

  it('should login an user when called [HTTP SPY]', (done: DoneFn) => {
    // mock data for user login
    const loginUserMockReq = {
      email: 'eve.holt@reqres.in',
      password: 'yamini03'
    };

    const loginUserMockRes = {
      token: 'QpwL5tke4Pnpja7X4'
    };

    httpClientSpy.post.withArgs(environment.loginUsersApi, loginUserMockReq).and.returnValue(of(loginUserMockRes));

    // passing mockReq thru service and expecting the mockRes
    service.loginUser(loginUserMockReq).subscribe({
      next: (res: any) => {
        expect(res).toEqual(loginUserMockRes);
        done();
      },
      error: done.fail
    });
  });

});
