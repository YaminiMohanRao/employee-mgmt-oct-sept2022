import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let wrapper: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    wrapper = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  //test spec

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has default counterValue 0', () => {
    expect(component.counterValue).toEqual(0);
  });

  it('should increment counterValue correctly', () => {
    expect(component.counterValue).toEqual(0);
    component.handleIncrement(); // calling the event handler method directly
    expect(component.counterValue).toEqual(1);
    component.handleIncrement();
    component.handleIncrement();
    expect(component.counterValue).toEqual(3);
  });

  // TODO : should decrement counterValue correctly
  it('should decrement counterValue correctly', () => {
    component.counterValue = 2;
    expect(component.counterValue).toEqual(2);
    component.handleDecrement(); // calling the event handler method directly
    expect(component.counterValue).toEqual(1);
    component.handleDecrement();
    component.handleDecrement();
    expect(component.counterValue).toEqual(0);
  });

  //Let's test the events
  it('should increment counterValue and update in HTML when increment btn clicked', () => {
    //find the btn from HTML template and trigger/emit the click event
    fixture.debugElement
      .query(By.css('.incrementBtn'))
      .triggerEventHandler('click', null);
    expect(component.counterValue).toEqual(1);

    fixture.detectChanges(); // detect the changes in html

    // along with it , let's check whether it is updated in html
    // const counterComponentHTML = fixture.nativeElement as HTMLElement; // taking up the comp html for testing
    // expect(counterComponentHTML.querySelector('p.counterText')?.textContent).toBe('Counter: 1');

    const counterHtmlText = fixture.debugElement.query(By.css('p.counterText'))
      .nativeElement.innerText;
    expect(counterHtmlText).toBe('Counter: 1');
  });

  //TODO : should decrement counterValue and update in HTML when decrement btn clicked
  it('should decrement counterValue and update in HTML when decrement btn clicked', () => {
    //find the btn from HTML template and trigger/emit the click event
    fixture.debugElement
      .query(By.css('.decrementBtn'))
      .triggerEventHandler('click', null);
    expect(component.counterValue).toEqual(0);

    fixture.detectChanges(); // detect the changes in html

    const counterHtmlText = fixture.debugElement.query(By.css('p.counterText'))
      .nativeElement.innerText;
    expect(counterHtmlText).toBe('Counter: 0');
  });

  //TODO : should increment CounterValue to 10 and display message Maximum Reached
  it('should increment CounterValue to 10 and display message Maximum Reached updated in HTML when increment btn clicked', () => {
    //find the btn from HTML template and trigger/emit the click event
    component.counterValue = 10;
    fixture.debugElement
      .query(By.css('.incrementBtn'))
      .triggerEventHandler('click', null);
    expect(component.counterValue).toEqual(10);

    fixture.detectChanges(); // detect the changes in html

    const counterMessageInc = fixture.debugElement.query(
      By.css('p.messageText')
    ).nativeElement.innerText;
    expect(counterMessageInc).toBe('Maximum Reached');
  });

  //TODO : should decrement CounterValue to 0 and display message Minimum Reached
  it('should decrement CounterValue to 0 and display message Minimum Reached updated in HTML when decrement btn clicked', () => {
    //find the btn from HTML template and trigger/emit the click event
    component.counterValue = 0; //assigning the counterValue
    fixture.debugElement
      .query(By.css('.decrementBtn'))
      .triggerEventHandler('click', null);
    expect(component.counterValue).toEqual(0); //checking the counterValue

    fixture.detectChanges(); // detect the changes in html

    const counterMessageDec = fixture.debugElement.query(
      By.css('p.messageText')
    ).nativeElement.innerText;
    expect(counterMessageDec).toBe('Minimum Reached');
  });

  //TODO : should render button labels as Increment and Decrement in HTML
  it('should render button labels as Increment and Decrement in HTML', () => {
    const counterCompHTML = fixture.nativeElement as HTMLElement;
    expect(
      counterCompHTML.querySelector('button.incrementBtn')?.textContent
    ).toMatch('Increment');
    expect(
      counterCompHTML.querySelector('button.decrementBtn')?.textContent
    ).toMatch('Decrement');
  });

  // testing inline styles of html element
  it('should have red bg color in h2 element', () => {
    const bgColor = wrapper.querySelector('h2')?.style.backgroundColor;
    expect(bgColor).toBe('rgb(255, 0, 0)'); // not recommended to use the exact color like 'red', 'green'
  });

  //TODO : should render the button elements have css class btn
  it('should render the button elements have css class btn', () => {
    expect(wrapper.querySelector('.incrementBtn'))?.toHaveClass('btn');
    expect(wrapper.querySelector('.decrementBtn'))?.toHaveClass('btn');
  });

  // testing whether ngOnInit is called
  it('ngOnInit called', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });
});
