import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FlaskapiService } from '../flaskapi.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;

  constructor(
    private formBuilder: FormBuilder, private flaskApi: FlaskapiService, private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstName:'',
      lastName:'',
      email: '',
      phone:'',
      dateOfBirth: Date,
      address:'',
      city:'',
      zipCode:'',
      country: 'PR',
      username: '',
      password:'',
      retype_password:'',
    })
   }

  ngOnInit(): void {
    
  }

  onSubmit(userData: any){

      const user: User = {  
        firstName: userData.firstName, 
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone, 
        dateOfBirth: userData.dateOfBirth,
        address : userData.address,
        city: userData.city, 
        zipCode: userData.zipCode, 
        country: userData.country,
        username:userData.username, 
        password:userData.password};

        this.flaskApi
        .createUser(user)
        .subscribe(() => this.router.navigate["/"]),
        error => alert(error.message);
        
      
      this.registerForm.reset();

      console.warn('Successfuly registered!');
        
    
  }

}
