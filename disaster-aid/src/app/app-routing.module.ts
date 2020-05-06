import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing_page', pathMatch: 'full'}, //Make home the default landing page
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: 'landing_page', component: LandingPageComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
