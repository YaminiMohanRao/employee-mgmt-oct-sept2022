import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { IAuth } from '../../models/iauth';
import { AuthService } from '../../services/auth.service';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let service: AuthService;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // positive state of the form
  it('has valid form when all fields are properly filled', () => {
    component.signupForm?.controls['email'].setValue('eve.holt@reqres.in');
    component.signupForm?.controls['password'].setValue('Yamini03');
    component.signupForm?.controls['confirmPassword'].setValue('Yamini03');
    expect(component.signupForm.valid).toBeTrue();
  });

  // negative state of the form
  it('has invalid form when all fields are not filled properly', () => {
    component.signupForm?.controls['email'].setValue('a@b.com');
    component.signupForm?.controls['password'].setValue('yamini03');
    component.signupForm?.controls['confirmPassword'].setValue('yamini');
    expect(component.signupForm.valid).toBeFalse();
  });

  // submission logic -- spyOn
  it('should call handleSignup - all through [TS]', () => {
    spyOn(component, 'handleSignup');
    component.handleSignup();
    expect(component.handleSignup).toHaveBeenCalled();
  });

  // testing handleSignup thru service
  it('register the users successfully on signup', (done: DoneFn) => {
    component.signupForm?.controls['email'].setValue('eve.holt@reqres.in');
    component.signupForm?.controls['password'].setValue('Yamini03');
    component.signupForm?.controls['confirmPassword'].setValue('Yamini03');

    fixture.detectChanges(); // should detect changes in HTML only then submit btn will be enabled

    spyOn(component, 'handleSignup').and.callThrough();
    component.handleSignup();
    expect(component.handleSignup).toHaveBeenCalled();

    // mock response
    const mockResponse = {
      id: '4',
      token: 'QpwL5tke4Pnpja7X4'
    };

    spyOn(component.authService, 'signupUser')
      .withArgs(component.signupForm.value)
      .and.returnValue(of(mockResponse));
    component.authService.signupUser(component.signupForm.value).subscribe({
      next: (res) => {
        expect(res).toEqual(mockResponse);
        spyOn(component.signupForm, 'reset').and.callThrough();
        component.signupForm.reset();
        expect(component.signupForm.reset).toHaveBeenCalled();
        done();
      },
      error: () => {
        console.log('SOME ERROR OCCURED');
        done();
      }
    });
  });
});
