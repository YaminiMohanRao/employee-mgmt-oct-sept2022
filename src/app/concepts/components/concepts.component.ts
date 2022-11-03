import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { CebComponent } from '../components/ceb/ceb.component';

@Component({
  selector: 'app-concepts',
  templateUrl: './concepts.component.html',
  styles: []
})
export class ConceptsComponent implements OnInit, AfterViewInit {
  // public variable

  // interpolation related
  appName = 'Employee Manager App!';
  // companyName = 'Cognizant'
  companyProfile = {
    name: 'Cognizant',
    employeesCount: 300000
  };

  // Property Binding related
  teamSize = 14;

  // two way binding related
  courseName = 'Angular 13';

  //custom property related
  myAge = 100;

  //custom event binding related
  dataReceivedFromChildComp: any;

  //@viewchild related
  dataAccessedFromChild: string = '';

  //for directives
  isLoggedIn = false;
  skills = ['HTML', 'CSS', 'JS', 'ng', 'NodeJs'];
  //ngSwitch related
  day = 1;

  @ViewChild(CebComponent, { static: false }) cebData!: CebComponent; // @ViewChild declare

  //ngTemplate related
  myContext = {
    $implicit: 'World',
    age: 20,
    name: 'John'
  };

  // pipes related
  dummyText =
    'Thanks for joining, Welcome to the Session and Happy Learning Everyone.This is Learning and Development Team';
  today: Date = new Date();

  book: any = {
    name: 'angular-syntax-helper',
    version: '5.0.3',
    author: 'Yusong Hsu'
  };

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    //when @ViewChild with static true we can access child comp's data here
    console.log(this.cebData);
  }

  ngAfterViewInit(): void {
    //when @ViewChild with static false we can access child comp's data here
    this.dataAccessedFromChild = this.cebData.DataFromChild;
    this.cd.detectChanges();
  }

  // Event Binding related
  handleClickMe(event: any) {
    // Disable the button
    event.target.disabled = true;

    // Change the label to Clicked
    event.target.innerText = 'Clicked';
    alert('Clicked');
  }

  // Step 6 :event handler of the custom event
  handleProfileLoaded(event: any) {
    console.log('Indise handleProfileLoaded'); // step 7: we receive the data thru event
    console.log(event);
    this.dataReceivedFromChildComp = event;
  }
}
