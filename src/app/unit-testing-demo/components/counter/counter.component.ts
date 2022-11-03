import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styles: []
})
export class CounterComponent implements OnInit {

  counterValue = 0;
  message = '';

  constructor() {}

  ngOnInit(): void {}

  handleIncrement() {
    if(this.counterValue < 10){
      this.counterValue++; // increments the counterValue
      this.message = '';
    }else{
      this.message = 'Maximum Reached'; //displays the message when maximum value reached
    }
  }

  handleDecrement() {
    if(this.counterValue > 0){
      this.counterValue--; // decrements the counterValue
      this.message = '';
    }else{
      this.message = 'Minimum Reached'; //displays the message when minimum value reached
    }
  }
}
