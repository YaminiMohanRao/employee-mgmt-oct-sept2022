
// Test Pattern: Given, When, Then -- similar to AAA (Arrange, Act, Assert)
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { CebComponent } from './concepts/components/ceb/ceb.component';
import { ConceptsComponent } from './concepts/components/concepts.component';
import { CpbComponent } from './concepts/components/cpb/cpb.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { MenuComponent } from './shared/components/menu/menu.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    // similar to app module 
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        HomeComponent,
        ConceptsComponent,
        AboutComponent,
        CpbComponent,
        CebComponent
      ]
    }).compileComponents();
  });

  // test spec #1 | test case
  it('should create the app', () => { // 'it'- an api from jasmine
    // when
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance; // we are taking up comp.ts for testing

    // then Assert
    //'expect' - api from jasmine | tobetruthy - is a matcher from jasmine
    expect(app).toBeTruthy(); 
  });

  // test spec #2
  it('should have a variable title with value being \'Employee Manager!\'', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toBe('Employee Manager!');
  });

});
