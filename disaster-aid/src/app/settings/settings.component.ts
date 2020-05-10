import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { User } from '../user';
import { UserApiService } from '../userapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settingsForm: FormGroup;
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
  buttonClicked:String;  

  firstNameDisabled: boolean = true;
  lastNameDisabled:boolean = true;
  emailDisabled:boolean = true;
  phoneDisabled:boolean = true;
  dateOfBirthDisabled:boolean = true;
  addressDisabled:boolean = true;
  cityDisabled:boolean = true;
  zipCodeDisabled:boolean = true;
  usernameDisabled:boolean = true;
  passwordDisabled:boolean = true;

  myUser:User;

  constructor(
    private formBuilder: FormBuilder,
    private userApi: UserApiService,
    private router: Router
  ) { 
    this.settingsForm = this.formBuilder.group({
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
      password:''
    })
  }

  ngOnInit(): void {
    if(localStorage.getItem('loggedInUserID') == null) {this.router.navigate(["\login"]); }
    console.log(localStorage.getItem('loggedInUserID'));
      
    this.userApi.getUserById(localStorage.getItem('loggedInUserID')).subscribe(
      res => { this.myUser = res.user,
      console.log(res);
      },error =>
       console.error(error)
    )
  }


  onSubmit(userData){
    
    if(userData.firstName != '') this.myUser.firstName = userData.firstName;
    if(userData.lastName != '') this.myUser.lastName = userData.lastName;
    if(userData.email != '') this.myUser.email = userData.email;
    if(userData.phone != '') this.myUser.phone = userData.phone;
    if(userData.dateOfBirth != '') this.myUser.dateOfBirth = userData.dateOfBirth; 
    if(userData.address != '') this.myUser.address = userData.address;
    if(userData.city != '') this.myUser.city = userData.city;
    if(userData.zipCode != '') this.myUser.zipCode = userData.zipCode;
    if(userData.username != '') this.myUser.username = userData.username;
    if(userData.password != '') this.myUser.password = userData.password;
  
      this.userApi.editUser(this.myUser).subscribe(error => alert(error.message));
    
  }


}
