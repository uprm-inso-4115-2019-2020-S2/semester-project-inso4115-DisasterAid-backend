import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestComponent } from './request/request.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { UserApiService } from './userapi.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RequestApiService } from './request-api.service';
import { SettingsComponent } from './settings/settings.component';
import { SeekDonationsComponent } from './seek-donations/seek-donations.component';
import {RequestModalComponent} from './request-modal/request-modal.component';
import { DonationsComponent } from './donations/donations.component';
import { SeekDonationsService } from './seek-donations.service';
import { DonationsService } from './donations.service';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    RequestComponent,
    RequestModalComponent,
    LoginComponent,
    HomeComponent,
    LandingPageComponent,
    SettingsComponent,
    SeekDonationsComponent,
    DonationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [UserApiService, RequestApiService, SeekDonationsService, DonationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
