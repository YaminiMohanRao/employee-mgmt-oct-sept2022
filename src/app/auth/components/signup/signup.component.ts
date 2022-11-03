import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { NavigationHelper } from '../../../shared/utils/navigation-helper';
import { passwordStrengthValidator } from 'src/app/shared/custom-validators/password-strength-validator';
import { passwordMatchValidator } from 'src/app/shared/custom-validators/password-match-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit {
  // Step 1 : Have the form tag equivalent in TS
  signupForm!: FormGroup;

  constructor(
    public authService: AuthService,
    private toastr: ToastrService,
    private navigationHelper: NavigationHelper
  ) {}

  ngOnInit(): void {
    // Step 1 continues
    this.signupForm = new FormGroup(
      {
        // Step 2 : Have the input tags equivalent in TS
        email: new FormControl('', [Validators.required, Validators.email]), // Step 5 : Let's work on validation
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6), // validating minimum length
          passwordStrengthValidator()  // password validator
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          passwordStrengthValidator()  // password validator
        ]) // for Step 6 : refer html
      },
      [passwordMatchValidator('password', 'confirmPassword')]
    ); // for Step : 3 refer html
  }

  handleSignup() {
    // form data
    console.log(this.signupForm.value);
    // send the above form data to the service
    this.authService.signupUser(this.signupForm.value).subscribe({
      // postive case for signup
      next: (res: any) => {
        // get the response from service
        if (res.id && res.token) {
          // receiving token as res from this api
          this.toastr.success('Registered Successfully');
          this.signupForm.reset(); // reset the form after submitting
          this.navigationHelper.navigateTo('/auth/login'); // redirect to Login
        }
      },
      // when error occured
      error: (error: any) => {
        console.log(error); // handling error
        this.toastr.error(error['error']['error']); // displaying error message
      }
    });
  }
}
