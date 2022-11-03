import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BnNgIdleService } from 'bn-ng-idle';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ConceptsComponent } from './concepts/components/concepts.component';
import { AboutComponent } from './about/about.component';
import { CpbComponent } from './concepts/components/cpb/cpb.component';
import { CebComponent } from './concepts/components/ceb/ceb.component';
import { CalcComponent } from './about/components/calc/calc.component';
import { ColorizerDirective } from './concepts/directives/colorizer.directive';
import { DemoIfDirective } from './concepts/directives/demo-if.directive';
import { UnlessDirective } from './concepts/directives/unless.directive';
import { UnitTestingDemoComponent } from './unit-testing-demo/components/unit-testing-demo/unit-testing-demo.component';
import { CounterComponent } from './unit-testing-demo/components/counter/counter.component';
import { HighlightDirective } from './unit-testing-demo/directives/highlight.directive';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EllipsisPipe } from './shared/pipes/ellipsis.pipe';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent,
    ConceptsComponent,
    AboutComponent,
    CpbComponent,
    CebComponent,
    CalcComponent,
    ColorizerDirective,
    DemoIfDirective,
    UnlessDirective,
    UnitTestingDemoComponent,
    CounterComponent,
    HighlightDirective,
    PageNotFoundComponent,
    EllipsisPipe
  ],
  imports: [
    BrowserModule,
    FormsModule, //for ngModel
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    NgxSpinnerModule,
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    BnNgIdleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent] // AppModule should be bootstrapped with AppComponent
})
export class AppModule {}
