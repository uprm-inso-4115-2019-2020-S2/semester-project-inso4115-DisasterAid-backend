import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      first_name:'',
      last_name:'',
      email: '',
      date_of_birth: new FormControl(),
      password:'',
      retype_password:'',
      address:''
    })
   }

  ngOnInit(): void {
    
  }

  onSubmit(userData){
    this.registerForm.reset();

    console.warn('Successfuly registered!');
  }

}
