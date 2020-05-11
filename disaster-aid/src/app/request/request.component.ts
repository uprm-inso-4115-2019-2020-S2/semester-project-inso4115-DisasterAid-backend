import {Component, OnInit} from '@angular/core';
import {Request} from '../request';
import {FormBuilder} from '@angular/forms';
import { UserApiService } from '../userapi.service';
import { Router } from '@angular/router';
import { MyRequest } from '../my-request';
import { RequestApiService } from '../request-api.service';

// @ts-ignore
@Component({ selector: 'app-request',
  templateUrl: 'request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  addRequestForm;
  showRequestForm = false;
  loggedInUserID:String;

  // mock list. in reality it would get loaded with db donations (GET all donations)
  public requestList: MyRequest[] = [ ];

  location = 'Arecibo';  // only field that comes from user and not donation. (FETCH user.location)

constructor( private userApi: UserApiService, private router:Router, private requestApi: RequestApiService) {}

  ngOnInit(): void {
    if(localStorage.getItem('loggedInUserID') == null){ this.router.navigate(['/login'])}
    this.loggedInUserID = localStorage.getItem('loggedInUserID');

    this.userApi.getUserById(this.loggedInUserID).subscribe(res =>{
      this.requestList = res.user.requests;
    }

    )
  }


cancelRequest(rid: String){
  
  this.requestApi.deleteRequest(rid).subscribe(res=>
     {console.log(res),
      this.ngOnInit()
  }, 
  error=>console.error(error));
  
}


}
