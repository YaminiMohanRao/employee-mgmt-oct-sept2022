import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { IEmployee } from '../../models/iemployee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styles: []
})
export class ListEmployeesComponent implements OnInit, OnDestroy {
  employees: IEmployee[] = [];
  employeeSubscription!: Subscription; // realted to subscribe
  isLoading = false; // for Loader

  constructor(private employeeService: EmployeeService, private spinner: NgxSpinnerService) {
    //1.connect with the service
  }

  ngOnInit(): void {
    this.spinner.show(); // to show spinner
    // Ideal for REST API calls
    // 2. Send the req to the service
    this.employeeSubscription = this.employeeService
      .getEmployees()
      .subscribe((res: IEmployee[]) => {
        // 3. get the response from service
        this.employees = res;
        this.spinner.hide(); // to hide spinner
      });
  }

  ngOnDestroy(): void {
    // whenever the comp goes out of the view -- this will be executed
    // ideal place for you to clear data, clear interval and timeout, unsbscribe
    // if (this.employees && this.employees.length > 0) {
    //   this.employees.length = 0;
    // }
    this.employeeSubscription.unsubscribe();
  }
}
