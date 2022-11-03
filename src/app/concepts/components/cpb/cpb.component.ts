import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cpb',
  template: `
    <div>
      Parent to Child Component Communication
    </div>
    <p>My Age: {{age}} </p>
  `,
  styles: [
  ]
})
export class CpbComponent implements OnInit {

  //step1: let's have a variable
  @Input() age = 24; //step2: let's make variable as custom property by @Input()
  
  //refer concepts.comp.html for step 3

  constructor() { }

  ngOnInit(): void {
  }

}
