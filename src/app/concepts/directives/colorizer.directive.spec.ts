import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColorizerDirective } from './colorizer.directive';

// 1. Create a mock component with appHighlight in its html

@Component({
  template: `
    <div appColorizer>Testing Colorizer Directive with Mock Comp</div>
  `
})
class MockComponent {} // No need to export as we will use this comp here itself

// 2. test whether the div in the above mock comp is getting bg color

describe('ColorizerDirective', () => {
  let fixture: ComponentFixture<MockComponent>;

  // Step 2.1 Preparing MockComponent for testing - loading it into the TestBed

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [MockComponent, ColorizerDirective]
    }).createComponent(MockComponent);

    fixture.detectChanges(); // detecting the changes in html of mockcomp
  });

  // Step 2.2 let's test whether div of MockComponent has red bg color, height and padding
  it('should have a <div> with bg color, height and padding', () => {
    const colorizerWrapperEl: HTMLElement =
      fixture.nativeElement.querySelector('div');
    expect(colorizerWrapperEl.style.backgroundColor).toBe('red');
    expect(colorizerWrapperEl.style.height).toBe('60px');
  });

  // should have a <p> element with textcontent, font size and float right
  it('should have a <p> element with textcontent, font size and float right', () => {
    const colorizerWrapperEl: HTMLElement = fixture.nativeElement
      .querySelector('div')
      .querySelector('p');
    expect(colorizerWrapperEl?.textContent).toBe(
      'Powered By Colorizer Directive'
    );
    expect(colorizerWrapperEl?.style.float).toBe('right');
    expect(colorizerWrapperEl?.style.fontSize).toBe('20px');
  });

  // Testing whether the background-color of <div> has changed to yellow or not after clicking on <div>
  it('should change bgColor to yellow and border to solid green when clicked on <div>', () => {
    fixture.nativeElement.querySelector('div').click();
    fixture.detectChanges();
    const bgColor =
      fixture.nativeElement.querySelector('div').style.backgroundColor;
    const color = fixture.nativeElement.querySelector('div').style.color;
    const border = fixture.nativeElement.querySelector('div').style.border;
    expect(bgColor).toBe('yellow');
    expect(color).toBe('rgb(0, 0, 0)');
    expect(border).toBe('5px solid green');
  });

  // Testing whether the background-color is changing to lightgreen after mouseover on <div>
  it('should change the bgColor to lightgreen when mouseover on <div>', () => {
    const colorizerWrapperEl = fixture.debugElement.query(By.css('div')); // fetching the div element
    colorizerWrapperEl.triggerEventHandler('mouseover', null);
    // detecting changes after mouseover
    fixture.detectChanges();
    const bgColor =
      fixture.nativeElement.querySelector('div').style.backgroundColor;
    expect(bgColor).toBe('lightgreen');
  });

  // Testing whether the background-color is changing to red after mouseout on <div>
  it('should change the bgColor to red when mouseout on <div>', () => {
    const colorizerWrapperEl = fixture.debugElement.query(By.css('div'));  // fetching the div element
    colorizerWrapperEl.triggerEventHandler('mouseout', null);
    // detecting changes after mouseout
    fixture.detectChanges(); 
    const bgColor =
      fixture.nativeElement.querySelector('div').style.backgroundColor;
    expect(bgColor).toBe('red');
  });
});
