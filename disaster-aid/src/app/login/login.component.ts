import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import authenticationService;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password:'',
    })
   }
    private authenticationService: AuthenticationService

  ngOnInit(){
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(userData){
    this.loading = true;
            this.authenticationService.login(this.model.email, this.model.password)
                .subscribe(
                    data => {
                        this.router.navigate([this.returnUrl]);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });

    console.warn('Successfuly registered!');
  }

}
