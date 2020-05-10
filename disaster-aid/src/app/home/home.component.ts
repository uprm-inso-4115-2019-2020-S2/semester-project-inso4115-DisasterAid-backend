import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserApiService } from '../userapi.service';
import {Subscription} from 'rxjs/Subscription';
import { User } from '../user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  userListSubs: Subscription;
  userList: User[] = [];
  loggedInUserID: string;
  myInfo: string;

  constructor(private userApi: UserApiService, private router: Router) { }
  
  ngOnInit(): void {

      this.loggedInUserID = localStorage.getItem("loggedInUserID");

      this.userApi.getUserById(this.loggedInUserID).subscribe(res => this.myInfo =  JSON.stringify(res));

      this.userApi
      .getUsers().subscribe(res => {

         console.log(res);
          for(let i=0; i< res.users.length; i++){
          const aUser:User = res.users[i];
          this.userList[i] = aUser;

        }
      },
      error => console.log(error)
      );



  }

  ngOnDestroy(): void {
    this.userListSubs.unsubscribe();
  }

}
