import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ceb',
  template: `
  <div>
    <p>Let's send some data to parent comp</p>
    <button (click)="handleSendDataToParent()">Send Data to Parent Comp</button>
  </div>
  `,
  styles: [
  ]
})
export class CebComponent implements OnInit {

  // Step 1: Let's work on to define a custom event
  // Step 1.1: Let's have an obj of Eventemitter class
  @Output() profileLoaded = new EventEmitter() // Step 2 : Let's make it custom event by using @Output

  // Step 2: Let's have the data to send to parent comp
  profile = {
    name: 'Steve',
    city: 'London'
  }

  DataFromChild: string = 'Hello from Child using @ViewChild' //data to parent comp through @ViewChild

  constructor() { }

  ngOnInit(): void {
  }

  handleSendDataToParent() {
    // step 3: Let's emit/trigger the custom event thru program
    // along with it let's send the data to parent comp
    // console.log('Will send soon');
    this.profileLoaded.emit(this.profile); // refer concepts.comp.html
  }

}
