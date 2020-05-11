import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserApiService } from '../userapi.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  validUser: boolean;
  loggedInUserID: string;
  loginFailed:boolean = false;
  warningMessage:string;

  constructor(
    private formBuilder: FormBuilder,
    private usersApi: UserApiService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password:'',
    })
   }

  ngOnInit(): void {
    
  }


  onSubmit(userData){
    this.loginFailed = false;

    this.usersApi
    .login(userData.username, userData.password).subscribe(res => {
      console.log(res);
      this.loggedInUserID = res.uid;  
      localStorage.setItem('loggedInUserID', this.loggedInUserID);
      this.router.navigate(["/home"]);
      
    },
    error => {
      this.loginFailed = true;
      console.log(error);
      this.warningMessage = error.error.message;
    }
    );

   
   
  }

}
