import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';

import { ListEmployeesComponent } from './list-employees.component';

describe('ListEmployeesComponent', () => {
  let component: ListEmployeesComponent;
  let fixture: ComponentFixture<ListEmployeesComponent>;
  let employeeService: EmployeeService;

  /*Steps for Mocking
  1.Having the mock data of array with 2 objects
  2. Prepare for making a service's api method
        2.1 What service to mock? EmployeeService
        2.2 What api method to mock? getEmployees()
  3. Provide the mock data for the service request
  */

  const mockEmployeeList = [
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListEmployeesComponent],
      imports: [HttpClientModule],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            // mocking getEmployees method to return mockEmployeeList  data as observable
            getEmployees: () => of(mockEmployeeList)
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmployeesComponent);
    component = fixture.componentInstance;
    // important as we dep  inj this service in our project
    employeeService = TestBed.inject(EmployeeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // using timeout -- checking ajax call's  response
  /*it('has 10 employees initially', (done) => {
    component.ngOnInit();
    setTimeout(() => {
      expect(component.employees.length).toEqual(10);
      done();
    }, 4000);
  });

  it('should render employeename "Leanne Graham"', (done) => {
    component.ngOnInit();

    setTimeout(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('h5').innerText).toBe(
        'Leanne Graham'
      );
      done();
    }, 4000);
  }); */

  /* Challenges / Disadvantages of Testing Direct API request like the above
  1. Time Consuming
  2. Backend REST API may have data inconsistencies
  3. Backend might not be stable / may still be in development
  So, what's the solution -- Mocks,Pipes */

  it('should have an array with length 2 in employees [MOCKINGAPI]', () => {
    expect(component.employees.length).toEqual(2);
  });

  it('should have employee from service [MOCKINGAPI]', () => {
    expect(component.employees).toEqual(mockEmployeeList);
  });

  // TODO: test the HTML element h5
  it('should have h5 element with employeename "Virat Kohli"', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h5').innerText).toBe('Virat Kohli');
  });

});
