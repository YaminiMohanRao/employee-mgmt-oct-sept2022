import { Component, OnInit } from '@angular/core';
import { NavigationHelper } from '../../../shared/utils/navigation-helper';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  autoLogoutSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private navigationHelper: NavigationHelper, // can be used instead router
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bnIdle: BnNgIdleService // for auto logout
  ) {}

  ngOnInit(): void {}

  handleLogin(loginForm: NgForm) {
    // setting type as ngForm since we pass the form Data
    // Form Data
    console.log(loginForm.value);
    // send the data to service
    this.authService.loginUser(loginForm.value).subscribe({
      // postive case for login
      next: (res: any) => {
        // get the response from service
        if (res.token) {
          // receiving token as res from this api
          // Let's save the token in cookies / localStorage / sessionStorage
          localStorage.setItem('authToken', res.token); // saving the token as authToken
          // post login rediredtTo the return URL
          const redirectTo =
            this.activatedRoute.snapshot.queryParams['redirectTo'];
          this.router.navigateByUrl(redirectTo);
          // refer auth.guard.ts
          this.toastr.success('Login Successful');
          // routing to login screen if user is inactive or idle for 5 mins using BnNgIdleService
          this.autoLogoutSubscription = this.bnIdle.startWatching(300).subscribe(() => {
            if (localStorage.getItem('authToken')) {
              this.toastr.info('Session Expired, Please Login');
              this.authService.logout();
            }
            this.autoLogoutSubscription.unsubscribe();
          });
        }
      },
      // when error occured
      error: (error: any) => {
        console.log(error); // handling error
        this.toastr.error('Invalid Credentials'); // displaying error message
        // we can also have below error message
        // this.toastr.error(error['error']['error']);
      }
    });
  }
}
