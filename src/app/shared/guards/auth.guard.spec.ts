import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let injector: TestBed;
  let authService: AuthService;
  let guard: AuthGuard;
  let routeMock: any = { snapshot: {} }; // to mock the ActivatedRouteSnapshot dependency;
  let routeStateMock: any = { snapshot: {}, url: '/about' };
  // to mock the RouterStateSnapshot dependency used to obtain a protected path that a user tried to access
  let routerMock = { navigate: jasmine.createSpy('navigate') };
  // is used to create a spy on the navigate() function to verify the correct work of redirection issued by our guard.

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthGuard, { provide: Router, useValue: routerMock }]
    });
    injector = getTestBed();
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // positive case
  it('should allow the authenticated user to access the app', () => {
    spyOn(authService, 'isAuth').and.returnValue(true);
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
  });

  // negative case
  // testing whether tha unauthenticated user is redirected to login
  it('should redirect an unauthenticated user to the login route', () => {
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['auth', 'login'], {
      queryParams: { redirectTo: '/about' }
    });
  });
});
