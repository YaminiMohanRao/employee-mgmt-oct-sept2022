import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';

// Let's configure the URL's
const employeesRoutes: Routes = [
  {
    path: '',
    component: ListEmployeesComponent,
    data: { title: 'EmployeeManagerApp', animation: 'employeesPage' }
  },
  {
    path: 'add',
    component: AddEmployeeComponent,
    data: { title: 'AddEmployee', animation: 'addEmployeesPage' }
  },
  {
    path: ':id',
    component: EmployeeDetailsComponent,
    data: { title: 'EmployeeDetails', animation: 'employeeDetailsPage' }
  }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(employeesRoutes) // registering the above routes
  ],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {}
