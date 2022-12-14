import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    /* check whether the user is authenticated or not
     if yes
      return true
     else 
      redirect to login page
     return false 
    */

    if (this.authService.isAuth()) {
      // getting details abt authToken from authService
      // we need to redirect the user to requested page
      return true;
    } else {
      // state.url -- is the requested url
      this.router.navigate(['auth', 'login'], { queryParams: { redirectTo: state.url}});
      return false;
    }
  }
}
