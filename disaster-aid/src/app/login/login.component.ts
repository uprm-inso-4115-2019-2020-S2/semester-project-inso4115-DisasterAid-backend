import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {first} from 'rxjs/operators';

import {AccountService} from '../services/userapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    // private alertService: AlertService
  ) {}
   
    // private authenticationService: AuthenticationService

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {return this.loginForm.controls;}
  
  onSubmit(){
    this.submitted = true;
    
    // this.alertService.clear();
    
    //stop here if form is invalid
    if (this.loginForm.invalid){
      return;
    }

    this.loading = true;

    this.accountService.logIn(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
        });

    console.warn('Successfuly registered!');
  }

}

// this.authenticationService.logout();