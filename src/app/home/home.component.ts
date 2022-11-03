import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-home',
  // eslint-disable-next-line quotes
  template: `
    <p>Home</p>
    <input #homeInput />
  `,
  styles: []
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('homeInput') homeInput!: ElementRef;

  constructor() {}

  ngOnInit(): void {}
  // Life cycle hook
  // when the comp is coming into view ngOnInit will be executed
  // ideal place for you to clear the data, clear timeout, interval

  ngAfterViewInit() {
    this.homeInput.nativeElement.value = 'Welcome to Home!';
  }
}
