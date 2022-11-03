import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styles: []
})
export class AddEmployeeComponent implements OnInit {
  isSaved = false; // for submit button

  // Step 1 : Have the form tag equivalent in TS
  addEmployeeForm!: FormGroup;

  constructor(
    public employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService
  ) {
    // 1. connect with service
  }

  ngOnInit(): void {
    // Step 1 continues
    this.addEmployeeForm = new FormGroup({
      // Step 2 : Have the input tags equivalent in TS
      name: new FormControl('', Validators.required), // Step 5 : Let's work on validation
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$')
      ]), // for Step 6 : refer html
      email: new FormControl('', [Validators.required, Validators.email]) // can add multiple validators
      // for Step : 3 refer html
    });
  }

  handleAddEmployee() {
    // form data
    console.log(this.addEmployeeForm.value);

    // 2. send the above form data to service
    this.employeeService
      .createEmployee(this.addEmployeeForm.value)
      .subscribe((res: any) => {
        // 3. get the response from service
        if (res && res.id) {
          this.toastr.success('Added Successfully!'); // toaster message
          this.addEmployeeForm.reset();
        }
      });
  }

  handleGoBack() {
    this.router.navigateByUrl('/employees');
  }
}
