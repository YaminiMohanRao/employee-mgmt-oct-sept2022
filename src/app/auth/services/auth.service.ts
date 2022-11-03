import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { NavigationHelper } from 'src/app/shared/utils/navigation-helper';
import { environment } from 'src/environments/environment';
import { IAuth } from '../models/iauth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private navigationHelper: NavigationHelper) {}

  signupUser(signupData: IAuth) {
    console.log(signupData);
    return this.http.post(environment.signupUsersApi, signupData).pipe(
      map((res: any) => {
        // 3. Get the response from the REST API
        console.log(res);
        // 4. send the res to the comp
        return res;
      }),
      catchError((error: any) => {
        // catching error
        throw error; // throwing the error
      })
    );
  }

  loginUser(loginData: IAuth) {
    console.log(loginData);
    return this.http.post(environment.loginUsersApi, loginData).pipe(
      map((res: any) => {
        // 3. Get the response from the REST API
        console.log(res);
        // 4. send the res to the comp
        return res;
      }),
      catchError((error: any) => {
        // catching error
        throw error; // throwing the error
      })
    );
  }

  /* after providing the response to login comp,
  checking if the token is available in session storage */

  /* the below is used by the authGuard */

  isAuth(): boolean {
    if (localStorage.getItem('authToken')) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('authToken');
    this.navigationHelper.navigateTo('/auth/login');
  }
}
