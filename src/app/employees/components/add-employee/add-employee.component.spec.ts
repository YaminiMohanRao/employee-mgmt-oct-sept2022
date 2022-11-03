import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { AddEmployeeComponent } from './add-employee.component';
import { of } from 'rxjs';
import { IEmployee } from '../../models/iemployee';
import { EmployeeService } from '../../services/employee.service';

describe('AddEmployeeComponent', () => {
  let component: AddEmployeeComponent;
  let fixture: ComponentFixture<AddEmployeeComponent>;
  let service: EmployeeService;
  let routerSpy = { navigateByUrl: jasmine.createSpy('navigateByUrl') }; // adding routerSpy to the router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEmployeeComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ToastrService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(EmployeeService);
    fixture.detectChanges();
  });

  // test spec #1
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test spec #2
  // positive state of the form
  it('has valid form when all fields are properly filled', () => {
    component.addEmployeeForm?.controls['name'].setValue('John');
    component.addEmployeeForm?.controls['phone'].setValue('1234567890');
    component.addEmployeeForm?.controls['email'].setValue('a@g.com');
    expect(component.addEmployeeForm.valid).toBeTrue();
  });

  // negative state of the form
  it('has invalid form when all fields are not filled properly', () => {
    component.addEmployeeForm?.controls['name'].setValue('');
    component.addEmployeeForm?.controls['phone'].setValue('123456789056');
    component.addEmployeeForm?.controls['email'].setValue('ag.com');
    expect(component.addEmployeeForm.valid).toBeFalse();
  });

  // submission logic -- spyOn
  it('should call handleAddEmployee - all through [TS]', () => {
    spyOn(component, 'handleAddEmployee');
    component.handleAddEmployee();
    expect(component.handleAddEmployee).toHaveBeenCalled();
  });

  // Let's test the handleAddEmployee method by triggering the click on Html button
  it('should call handleAddEmployee when the submit button is clicked', () => {
    // enter valid inputs only then, submit button will be enabled
    component.addEmployeeForm?.controls['name'].setValue('John');
    component.addEmployeeForm?.controls['phone'].setValue('1234567890');
    component.addEmployeeForm?.controls['email'].setValue('a@g.com');

    fixture.detectChanges(); // should detect changes in HTML only then submit btn will be enabled

    // Install a spy into an existing object
    spyOn(component, 'handleAddEmployee');

    // find the submit button element
    const submitBtn = fixture.debugElement.query(
      By.css('.submitBtn')
    ).nativeElement;
    submitBtn.click(); // we can click only if button becomes enabled -- for that we eed valid inputs
    expect(component.handleAddEmployee).toHaveBeenCalled();
  });

  it('should call handleAddEmployee when the submit button is clicked -- all through [HTML]', () => {
    // find the input
    const nameInput =
      fixture.debugElement.nativeElement.querySelector('#nameInput');
    // set values in input
    nameInput.value = 'John';
    // trigger the input event in all the input field
    nameInput.dispatchEvent(new Event('input'));

    const phoneInput =
      fixture.debugElement.nativeElement.querySelector('#phoneInput');
    phoneInput.value = '1234567890';
    phoneInput.dispatchEvent(new Event('input'));

    const emailInput =
      fixture.debugElement.nativeElement.querySelector('#emailInput');
    emailInput.value = 's@j.com';
    emailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges(); // should detect changes in HTML only then submit btn will be enabled

    // Install a spy into an existing object
    spyOn(component, 'handleAddEmployee');

    // find the submit button element
    const submitBtn = fixture.debugElement.query(
      By.css('.submitBtn')
    ).nativeElement;
    submitBtn.click(); // we can click only if button becomes enabled -- for that we eed valid inputs
    expect(component.handleAddEmployee).toHaveBeenCalled();
  });

  it('it has form with inputs that satisfy validation', () => {
    // find the input
    const nameInput =
      fixture.debugElement.nativeElement.querySelector('#nameInput');
    // set values in input
    nameInput.value = 'John';
    // trigger the input event in all the input field
    nameInput.dispatchEvent(new Event('input'));

    const phoneInput =
      fixture.debugElement.nativeElement.querySelector('#phoneInput');
    phoneInput.value = '1234567890';
    phoneInput.dispatchEvent(new Event('input'));

    const emailInput =
      fixture.debugElement.nativeElement.querySelector('#emailInput');
    emailInput.value = 's@j.com';
    emailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges(); // should detect changes in HTML only then submit btn will be enabled

    const nameRequiredEl =
      fixture.debugElement.nativeElement.querySelector('#nameRequired');
    expect(nameRequiredEl).toBeFalsy();

    const phoneRequiredEl =
      fixture.debugElement.nativeElement.querySelector('#phoneRequired');
    expect(phoneRequiredEl).toBeFalsy();

    const phoneMaxLengthEl =
      fixture.debugElement.nativeElement.querySelector('#phoneMaxLength');
    expect(phoneMaxLengthEl).toBeFalsy();

    const phonePatternEl =
      fixture.debugElement.nativeElement.querySelector('#phonePattern');
    expect(phonePatternEl).toBeFalsy();

    const emailRequiredEl =
      fixture.debugElement.nativeElement.querySelector('#emailRequired');
    expect(emailRequiredEl).toBeFalsy();

    const invalidEmailEl =
      fixture.debugElement.nativeElement.querySelector('#invalidEmail');
    expect(invalidEmailEl).toBeFalsy();
  });

  // invalid inputs
  // name with invalid input
  it('has name with invalid input and displays error messages', () => {
    // find the input
    const nameInput =
      fixture.debugElement.nativeElement.querySelector('#nameInput');
    nameInput.value = '';
    nameInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const nameRequiredEl =
      fixture.debugElement.nativeElement.querySelector('#nameRequired');
    expect(nameRequiredEl.innerText).toBe('Name is required');
  });

  // phone with invalid input
  it('has phone with invalid input and displays error messages', () => {
    // find the input
    const phoneInput =
      fixture.debugElement.nativeElement.querySelector('#phoneInput');
    phoneInput.value = '';
    phoneInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const phoneRequiredEl =
      fixture.debugElement.nativeElement.querySelector('#phoneRequired');
    expect(phoneRequiredEl.innerText).toBe('Phone is required');

    phoneInput.value = '123456789012';
    phoneInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const phoneMaxLengthEl =
      fixture.debugElement.nativeElement.querySelector('#phoneMaxLength');
    expect(phoneMaxLengthEl.innerText).toBe(
      'Please, Enter 10 digit Mobile Number'
    );

    phoneInput.value = 'abcd';
    phoneInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const phonePatternEl =
      fixture.debugElement.nativeElement.querySelector('#phonePattern');
    expect(phonePatternEl.innerText).toBe('Enter only Number');
  });

  // email with invalid input
  it('has email with invalid input and displays error messages', () => {
    // find the input
    const emailInput =
      fixture.debugElement.nativeElement.querySelector('#emailInput');
    emailInput.value = '';
    emailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const emailRequiredEl =
      fixture.debugElement.nativeElement.querySelector('#emailRequired');
    expect(emailRequiredEl.innerText).toBe('Email is required');

    emailInput.value = 'yaminigmailcom';
    emailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges(); // should detect changes in HTML only then submit btn will be enabled

    const invalidEmailEl =
      fixture.debugElement.nativeElement.querySelector('#invalidEmail');
    expect(invalidEmailEl.innerText).toBe('Email seems to be not valid');
  });

  // router testing
  it('should navigate to employees on click of Go back button', () => {
    component.handleGoBack();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/employees');
  });

  // testing handleAddEmployee thru service
  it('should send the form data to the service on click of Submit button and return response', (done: DoneFn) => {
    component.addEmployeeForm?.controls['name'].setValue('John');
    component.addEmployeeForm?.controls['phone'].setValue('1234567890');
    component.addEmployeeForm?.controls['email'].setValue('a@g.com');

    fixture.detectChanges(); // should detect changes in HTML only then submit btn will be enabled

  
    spyOn(component, 'handleAddEmployee').and.callThrough();
    component.handleAddEmployee();
    expect(component.handleAddEmployee).toHaveBeenCalled();

    const mockResponse = {
      id: 11,
      name: 'John',
      phone: '1234567890',
      email: 'a@g.com'
    };

    spyOn(component.employeeService, 'createEmployee')
      .withArgs(component.addEmployeeForm.value)
      .and.returnValue(of(mockResponse));
    component.employeeService.createEmployee(component.addEmployeeForm.value).subscribe({
      next: (res: any) => {
        expect(res).toEqual(mockResponse);
        spyOn(component.addEmployeeForm, 'reset').and.callThrough();
        component.addEmployeeForm.reset();
        expect(component.addEmployeeForm.reset).toHaveBeenCalled();
        done();
      },
      error: () => {
        console.log('SOME ERROR OCCURED');
        done();
      }
    });
  });

  // negative code spec
  it('should return error when form data is not valid', () => {
    component.addEmployeeForm?.controls['name'].setValue(''),
    component.addEmployeeForm?.controls['phone'].setValue(''),
    component.addEmployeeForm?.controls['email'].setValue('')

    fixture.detectChanges();

    spyOn(component.employeeService, 'createEmployee')
      .withArgs(component.addEmployeeForm.value)
      .and.throwError('Invalid Input');
    expect(function () {
      component.employeeService.createEmployee(component.addEmployeeForm.value);
    }).toThrow(new Error('Invalid Input'));
  });

});
