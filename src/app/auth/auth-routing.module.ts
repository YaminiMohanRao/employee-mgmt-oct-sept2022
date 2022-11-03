import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login', animation: 'loginPage' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Signup', animation: 'signupPage' }
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
