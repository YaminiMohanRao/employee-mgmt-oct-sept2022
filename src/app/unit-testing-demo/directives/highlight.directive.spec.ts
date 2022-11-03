import { Component, DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

// 1. Create a mock component with appHighlight in its html

@Component({
  template: `
    <div id="myDiv1" appHighlight="yellow">
      Testing directive with Mock Comp - yellow color
    </div>
    <div id="myDiv2" appHighlight="skyblue">
      Testing directive with Mock Comp - skyblue color
    </div>
    <div id="myDiv3" appHighlight>
      Testing directive with Mock Comp - light gray color
    </div>
    <div id="myDiv4">Testing directive with Mock Comp - no bg color</div>
    <input #box [appHighlight]="box.value" value="cyan" />
  `
})
class MockComponent {} // No need to export as we will use this comp here itself

// 2. test whether the div in the above mock comp is getting bg color
describe('HighlightDirective', () => {
  let fixture: ComponentFixture<MockComponent>;
  let highlightEl: DebugElement[]; // three elements with directive
  let bareDiv: DebugElement; // the div without the directive

  // Step 2.1 Preparing MockComponent for testing - loading it into the TestBed

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [MockComponent, HighlightDirective]
    }).createComponent(MockComponent);

    fixture.detectChanges(); // detecting the changes in html of mockcomp

    highlightEl = fixture.debugElement.queryAll(
      By.directive(HighlightDirective)
    ); // elements with directive

    bareDiv = fixture.debugElement.query(By.css('div:not([appHighlight])')); //element without directive
  });

  // Step 2.2 let's test whether div of MockComponent has yellow bg color or not
  it('should have a <div> with bg color yellow', () => {
    const highlightWrapperEl: HTMLElement =
      fixture.nativeElement.querySelector('#myDiv1');
    const bgColor = highlightWrapperEl.style.backgroundColor;
    expect(bgColor).toBe('yellow');
  });

  it('should have a <div> with bg color skyblue', () => {
    const highlightWrapperEl: HTMLElement =
      fixture.nativeElement.querySelector('#myDiv2');
    const bgColor = highlightWrapperEl.style.backgroundColor;
    expect(bgColor).toBe('skyblue');
  });

  it('should have a <div> with bg color light gray', () => {
    const highlightWrapperEl: HTMLElement =
      fixture.nativeElement.querySelector('#myDiv3');
    const bgColor = highlightWrapperEl.style.backgroundColor;
    expect(bgColor).toBe('rgb(211, 211, 211)');
  });

  it('should have a <div> with no bg color', () => {
    const divEl: HTMLElement = fixture.nativeElement.querySelector('#myDiv4');
    const bgColor = divEl.style.backgroundColor;
    expect(bgColor).toBe('');
  });

  // elements with an attached HighlightDirective
  it('should have three highlighted elements', () => {
    expect(highlightEl.length).toBe(4);
  });

  //input should have bg color as cyan
  it('should bind <input> background to value color', () => {
    const input = highlightEl[3].nativeElement as HTMLInputElement;
    expect(input.style.backgroundColor)
      .withContext('initial backgroundColor')
      .toBe('cyan');
  });

  // div without highlight directive
  it('bare <div> should not have a customProperty', () => {
    expect(bareDiv.properties['customProperty']).toBeUndefined();
  });
});
