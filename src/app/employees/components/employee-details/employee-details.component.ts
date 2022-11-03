import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styles: []
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any;
  duplicateEmployee: any;
  isLoading = false; // for Loader

  constructor(
    public employeeService: EmployeeService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    //1.connect with the service
  }

  ngOnInit(): void {
    this.spinner.show();
    // Reading URL param
    const empId: string | null = this.route.snapshot.paramMap.get('id');

    // Ideal for REST API calls
    // 2. Send the req to the service
    this.employeeService.getEmployeeById(empId).subscribe((res: any) => {
      // 3. get the response from service
      this.employee = res;
      this.spinner.hide();
    });
  }

  // Edit related
  handleEditModalOpen() {
    // saving it in duplicateEmployee for the Modal
    this.duplicateEmployee = { ...this.employee }; // shallow copy
  }

  // update employee related
  handleUpdateEmployee(updateEmployeeForm: NgForm) { // no need to send form data
    // submission handler
    // TODO: submit the above data to the REST API through service
    // console.log(this.duplicateEmployee); // submittable data
    // 2. send the updated employee data to the service
    this.employeeService
      .updateEmployeeById(this.duplicateEmployee)
      .subscribe((res: any) => {
        // 3. get the updated response from service
        this.employee = res;
        if (res && res.id) {
          this.toastr.success('Updated Successfully!'); // toaster message for update
        }
      });
  }

  // delete employee related
  handleDeleteEmployee() {
    // 1. Send the req to delete the data to the service
    this.employeeService.deleteEmployeeById(this.employee.id).subscribe(() => {
      this.toastr.success(
        'You are redirected to Employees List',
        'Deleted Successfully!'
      ); // toaster message for delete
      this.router.navigateByUrl('/employees');
    });
  }
}
