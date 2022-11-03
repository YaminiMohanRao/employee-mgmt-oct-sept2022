import { AbstractControl } from '@angular/forms';

export function passwordMatchValidator(password: string, confirmPassword: string) {
  return function (form: AbstractControl) {
    const passwordValue = form.get(password)?.value; // password value from the form
    const confirmPasswordValue = form.get(confirmPassword)?.value; // confirmPassword value the from form
    if (passwordValue === confirmPasswordValue) {
      // checking if password and confirmPassword are
      return null;
    }
    // return the error message
    return { passwordMismatchError: true };
  };
}
