import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit, AfterContentInit {
  //only footer is sending an element with elementRef #backToTop
  @ContentChild('backToTop') b2tElement!: ElementRef;

  menuItems: any[] = [
    {
      id: 1,
      name: 'Home',
      url: '/',
      isActive: true
    },
    {
      id: 2,
      name: 'Concepts',
      url: '/concepts',
      isActive: false
    },
    {
      id: 3,
      name: 'About',
      url: '/about',
      isActive: false
    },
    {
      id: 4,
      name: 'Employee Management',
      url: '/employees',
      isActive: false
    },
    {
      id: 5,
      name: 'Unit Testing',
      url: '/unit-testing',
      isActive: false
    },
    {
      id: 6,
      name: 'Products',
      url: '/products',
      isActive: false
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    // you will get undefined if such elRef is not sent from the parent component
    // we will get undefined once because header comp does not send the elRef #backToTop.
    // console.log(this.b2tElement); // only footer comp sends it
    if (this.b2tElement) {
      this.b2tElement.nativeElement.style.backgroundColor = '#eee';
    }
  }
}
