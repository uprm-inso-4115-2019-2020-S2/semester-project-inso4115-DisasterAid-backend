import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

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

  ngOnInit(): void {
    
  }

  onSubmit(userData){

    //PONER COSAS DEL BACKEND AQUI

    this.loginForm.reset();

    console.warn('Successfuly registered!');
  }

}
