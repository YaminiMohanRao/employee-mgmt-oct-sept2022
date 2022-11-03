import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { EllipsisPipe } from 'src/app/shared/pipes/ellipsis.pipe';
import { ColorizerDirective } from '../directives/colorizer.directive';
import { DemoIfDirective } from '../directives/demo-if.directive';
import { UnlessDirective } from '../directives/unless.directive';
import { CebComponent } from './ceb/ceb.component';

import { ConceptsComponent } from './concepts.component';
import { CpbComponent } from './cpb/cpb.component';

describe('ConceptsComponent', () => {
  let component: ConceptsComponent;
  let fixture: ComponentFixture<ConceptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        ConceptsComponent,
        CebComponent,
        CpbComponent,
        ColorizerDirective,
        DemoIfDirective,
        UnlessDirective,
        EllipsisPipe
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // testing whether the div element with colorizer directive has bgColor red
  it('should have backgroundColor red in div element where colorizer directive used', () => {
    const wrapper = fixture.nativeElement;
    const divEl: HTMLElement = wrapper.querySelector(
      '[data-testid="colorizerWrapper"]'
    );
    const bgColor = divEl?.style?.backgroundColor;
    expect(bgColor).toBe('red');
  });
});
