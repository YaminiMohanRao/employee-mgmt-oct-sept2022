import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AboutComponent } from './about.component';
import { CalcComponent } from './components/calc/calc.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        AboutComponent,
        CalcComponent
      ],
      imports: [
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // eslint-disable-next-line quotes
  it(`has featureName with 'About Us'`, () => {
    expect(component.featureName).toEqual('About Us');
  });

  it('should render featureName in h1', () => {
    const aboutCompHTML = fixture.nativeElement as HTMLElement;
    expect(aboutCompHTML.querySelector('h1')?.textContent).toBe(component.featureName);
  });
});
