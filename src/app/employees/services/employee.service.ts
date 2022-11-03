import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEmployee } from '../models/iemployee';

// Decorator
@Injectable({
  providedIn: 'root' // the class employee service is dependency injectable app wide
  // This tells Angular to provide the service in the application root level and 
  // the service will be created once (singleton service ) 
  // and provide the same instance in every module that injects the token.
})
export class EmployeeService {
  // eslint-disable-next-line no-unused-vars
  constructor(private http: HttpClient) {}

  // create employee
  createEmployee(formData: any) {
    // 1. get the form data from comp
    // console.log(formData);

    // 2. Send the form data to the REST API
    // 2.1 What's the REST API URL? - https://jsonplaceholder.typicode.com/users
    // 2.2 What's the http method - POST
    // 2.3 What's the REST API client tool - HttpClient
    return this.http
      .post(environment.employeesRestApi, formData)
      .pipe(
        map((res: any) => {
          // 3. Get the response from the REST API
          // console.log(res);
          // 4. send the res to the comp
          return res;
        })
      );
  }

  // list employee
  getEmployees(): Observable<IEmployee[]> {
    // 1. get the req from the com
    // 2. send the req to the REST API
    // 2.1 What's the REST API URL? - https://jsonplaceholder.typicode.com/users
    // 2.2 What's the http method - GET
    // 2.3 What's the REST API client tool - HttpClient
    return this.http.get<IEmployee[]>(environment.employeesRestApi).pipe(
      map((res: IEmployee[]) => {
        // 3. Get the response from the REST API
        // console.log(res);
        // 4. send the res to the comp
        // ideal place to filter, remove, sort, replacing, convert, tilt, adding
        return res;
      })
    );
  }

  // get employee by id
  getEmployeeById(empId: string | null): Observable<IEmployee> {
    // 1. get the req from the com
    console.log('will load data for' + empId);
    const restApiUrl = `${environment.employeesRestApi}/${empId}`;
    return this.http.get<IEmployee>(restApiUrl).pipe(
      map((res: IEmployee) => {
        // 3. Get the response from the REST API
        // 4. send the res to the comp
        return res;
      })
    );
  }

  // update employee data
  updateEmployeeById(employeeDetails: any): Observable<IEmployee[]> {
    // 1. get the req from the com
    const restApiUrl = `${environment.employeesRestApi}/${employeeDetails.id}`;
    return this.http.put<IEmployee[]>(restApiUrl, employeeDetails).pipe(
      map((res: IEmployee[]) => {
        // 3. Get the response from the REST API
        // 4. send the res to the comp
        return res;
      })
    );
  }

  // delete employee data by Id
  deleteEmployeeById(empId: string | null): Observable<IEmployee[]> {
    // 1. get the req from the com
    const restApiUrl = `${environment.employeesRestApi}/${empId}`;
    return this.http.delete<IEmployee[]>(restApiUrl).pipe(
      map((res: IEmployee[]) => {
        // 3. Get the response from the REST API
        // 4. send the res to the comp
        return res;
      })
    );
  }

}
