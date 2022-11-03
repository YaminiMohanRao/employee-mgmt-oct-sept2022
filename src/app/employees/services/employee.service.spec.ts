import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { stringify } from 'querystring';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEmployee } from '../models/iemployee';

import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  // set up spy
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(EmployeeService);
  });

  // setting up spy
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new EmployeeService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // testing getEmployees method only
  it('should return employees when called [HTTP SPY]', (done: DoneFn) => {
    // mock data for employees
    const mockEmployees = [
      {
        id: 1,
        name: 'Virat Kohli',
        email: 'v@k.com',
        phone: '1-770-736-803'
      },
      {
        id: 2,
        name: 'Steve Smith',
        email: 's@s.com',
        phone: '010-692-6599'
      }
    ];

    httpClientSpy.get.and.returnValue(of(mockEmployees));

    service.getEmployees().subscribe({
      next: (res: any) => {
        expect(res).toEqual(mockEmployees);
        done();
      },
      error: done.fail
    });
  });

  // testing createEmployee method
  it('should create an employee when called [HTTP SPY]', (done: DoneFn) => {
    // mock data for creating an employee
    const createEmployeeMockReq = {
      name: 'Virat Kohli',
      email: 'v@k.com',
      phone: '1234567890'
    };

    const createEmployeeMockRes = {
      id: 11,
      name: 'Virat Kohli',
      email: 'v@k.com',
      phone: '1234567890'
    };

    httpClientSpy.post.withArgs(environment.employeesRestApi, createEmployeeMockReq).and.returnValue(of(createEmployeeMockRes));

    service.createEmployee(createEmployeeMockReq).subscribe({
      next: (res: any) => {
        expect(res).toEqual(createEmployeeMockRes);
        done();
      },
      error: done.fail
    });
  });
});
