import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ConceptsComponent } from './concepts/components/concepts.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UnitTestingDemoComponent } from './unit-testing-demo/components/unit-testing-demo/unit-testing-demo.component';

// config the routes
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home', animation: 'homePage' }
  },
  {
    path: 'concepts',
    component: ConceptsComponent,
    data: { title: 'Concepts', animation: 'conceptsPage' }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About', animation: 'aboutPage' },
    canActivate: [AuthGuard]
  },
  {
    path: 'unit-testing',
    component: UnitTestingDemoComponent,
    data: { title: 'UnitTesting', animation: 'unitTestingPage' },
    canActivate: [AuthGuard]
  },
  // Lazy Loading
  {
    path: 'employees',
    loadChildren: () =>
      import('./employees/employees.module').then((m) => m.EmployeesModule)
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule)
  },

  //Wild Card Route for 404 request
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: 'PageNotFound' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
