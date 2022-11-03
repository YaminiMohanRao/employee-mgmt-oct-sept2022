import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { HighlightDirective } from '../../directives/highlight.directive';
import { CounterComponent } from '../counter/counter.component';

import { UnitTestingDemoComponent } from './unit-testing-demo.component';

describe('UnitTestingDemoComponent', () => {
  let component: UnitTestingDemoComponent;
  let fixture: ComponentFixture<UnitTestingDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UnitTestingDemoComponent,
        CounterComponent,
        HighlightDirective
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitTestingDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have backgroundColor skyblue in div element', () => {
    const wrapper = fixture.nativeElement;
    const divEl: HTMLElement = wrapper.querySelector(
      '[data-testid="highlightWrapper"]'
    );
    const bgColor = divEl?.style?.backgroundColor;
    expect(bgColor).toBe('skyblue');
  });

  // Approach #1 to test with fakeAsync and tick
  it('has featureName with proper text [APPTROACH #1]', fakeAsync(() => {
    component.ngOnInit();
    tick(3001);
    expect(component.featureName).toEqual(
      'Testing the ngOnInit with fakeAsync and tick'
    );
  }));

  // Approach #2 using timeout
  it('has featureName with proper text [APPTROACH #2]', ((done) => {
    component.ngOnInit();
    setTimeout(() => {
      expect(component.featureName).toEqual(
        'Testing the ngOnInit with fakeAsync and tick'
      );
      done();
    }, 3001);
  }));

});
