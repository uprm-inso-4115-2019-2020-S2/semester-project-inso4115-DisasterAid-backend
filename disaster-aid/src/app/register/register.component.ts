import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { UserApiService } from '../userapi.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;
  warningMessage : String;
  usernameList: User[];
  formNotValid = false;
  cityList = [ "Adjuntas",
    "Aguada",
    "Aguadilla",
    "Aguas Buenas",
    "Aibonito",
    "Arecibo",
    "Arroyo",
    "Añasco",
    "Barceloneta",
    "Barranquitas",
    "Bayamón",
    "Cabo Rojo",
    "Caguas",
    "Camuy",
    "Canóvanas",
    "Carolina",
    "Cataño",
    "Cayey",
    "Ceiba",
    "Ciales",
    "Cidra",
    "Coamo",
    "Comerío",
    "Corozal",
    "Culebra",
    "Dorado",
    "Fajardo",
    "Florida",
    "Guayama",
    "Guayanilla",
    "Guaynabo",
    "Gurabo",
    "Guánica",
    "Hatillo",
    "Hormigueros",
    "Humacao",
    "Isabela",
    "Jayuya",
    "Juana Díaz",
    "Juncos",
    "Lajas",
    "Lares",
    "Las Marías",
    "Las Piedras",
    "Loiza",
    "Luquillo",
    "Manatí",
    "Maricao",
    "Maunabo",
    "Mayagüez",
    "Moca",
    "Morovis",
    "Naguabo",
    "Naranjito",
    "Orocovis",
    "Patillas",
    "Peñuelas",
    "Ponce",
    "Quebradillas",
    "Rincón",
    "Rio Grande",
    "Sabana Grande",
    "Salinas",
    "San Germán",
    "San Juan",
    "San Lorenzo",
    "San Sebastián",
    "Santa Isabel",
    "Toa Alta",
    "Toa Baja",
    "Trujillo Alto",
    "Utuado",
    "Vega Alta",
    "Vega Baja",
    "Vieques",
    "Villalba",
    "Yabucoa",
    "Yauco" ];

  constructor(
    private formBuilder: FormBuilder, private usersApi: UserApiService, private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstName : '',
      lastName:'',
      email: '',
      phone: '',
      dateOfBirth: Date,
      address: '',
      city: '',
      zipCode: '',
      country: 'PR',
      username: '',
      password: '',
      retype_password: '',
    });
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


        if(this.isValidForm(userData)){
          this.formNotValid = false;

          this.usersApi.createUser(user).subscribe(
            res => {
              this.usersApi.login(user.username, user.password)
              .subscribe(
              res => {localStorage.setItem('loggedInUserID',res.uid),
              this.router.navigate(['/home'])
              }, error => 
              console.error(error.reason));
              this.registerForm.reset();
            },
          error => {
            this.formNotValid = true;
            if(error.error.message == "Server error!"){
              this.warningMessage = "Enter date of birth";
            }
            console.log(this.warningMessage);
            console.error(error);
          });
      

          
          console.warn('Successfuly registered!');
        } else this.formNotValid = true;
        
    
  }


  isValidForm(userData: any): boolean {
    console.log(userData.dateOfBirth.valu)
    if(userData.password != userData.retype_password){
      this.warningMessage = "Passwords do not match! ";
      return false;
    }
    if(
      userData.firstName == '' || userData.lastName == '' ||
      userData.email == '' || userData.phone == '' || 
      userData.dateOfBirth == 'mm/dd/yyyy' || userData.username =='' ||
      userData.password == '' || userData.address == '' ||
      userData.city == '' || userData.zipCode == ''){
      this.warningMessage = "All fields are required!"
      return false
      } 
      
    this.warningMessage = '';
    return true;

  }


}
