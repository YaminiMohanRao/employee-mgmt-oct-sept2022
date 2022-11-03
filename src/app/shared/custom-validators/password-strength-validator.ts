import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value); // for uppercase
    const hasLowerCase = /[a-z]+/.test(value); // for lowercase
    const hasNumeric = /[0-9]+/.test(value);  // for numeric
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric; // valid format

    return !passwordValid ? { passwordStrength: true } : null;
  };
}
