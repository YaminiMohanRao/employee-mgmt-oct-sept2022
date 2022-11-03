import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcComponent } from './calc.component';

describe('CalcComponent', () => {
  let component: CalcComponent;
  let fixture: ComponentFixture<CalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // testing whether h2 element has 'My Calculator'
  it('has My Calculator as heading in html', () => {
    const calciCompHTML = fixture.nativeElement as HTMLElement;
    expect(calciCompHTML.querySelector('h2')?.textContent).toMatch(/my calculator/i); // deals with case insensitive - regex
  });

  it('has add method that adds two numbers properly', () => {
    // sometimes multiple expectations are needed
    expect(component.add(10, 20)).toEqual(30);
    expect(component.add(6, 5)).toEqual(11);
  });

  it('has add which returns datatype number', () => {
    // checking the return type
    expect(component.add(10, 20)).not.toBeNaN(); //Nan - Not A Number
    expect(component.add(10, 20)).not.toBeUndefined();
    expect(component.add(10, 20)).not.toBeTrue();
  });

});
