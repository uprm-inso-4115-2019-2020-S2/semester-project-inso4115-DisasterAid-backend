import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserApiService } from '../userapi.service';
import {Subscription} from 'rxjs/Subscription';
import { User } from '../user';

import { User1} from '../user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  userListSubs: Subscription;
  userList : User[];

  pending = [new User1(1, 'Carlos J. Ayala'), new User1(2, 'Javier'), new User1(2, 'Javier')
  , new User1(2, 'Javier'), new User1(2, 'Javier'), new User1(2, 'Javier'), new User1(2, 'Javier')
  , new User1(2, 'Javier'), new User1(2, 'Javier'), new User1(2, 'Javier'), new User1(2, 'Javier')];  //FOR TESTING
  delivered = [new User1(3, 'Juan Del Pueblo'), new User1(4, 'Los $1200')];  //FOR TESTING
  numOfRequests = 10; //Displays the number of requests in the home page
  numOfDonations = 20; //Displays the number of donations in the home page

  constructor(private userApi: UserApiService) { }
  
  //Mock data; in practicality, these will be loaded with the info from db. 
  user = "John Doe"

  //mock pending list (should be loaded from db), other way to do it
  public pendingNamesList: String[] = [
    "Juan Vargas", "Brian Lopez", "Julia Belinski", "Robert Acar"
  ]
  //mock delivered list (should be loaded from db)
  public deliveredNamesList: String[] = [
    "Natalie Cruz", "Michael Scott", "Albert Cruz", "Marko", "Bienve", "Wilson"
  ]

  
  ngOnInit(): void {

    // this.userApi
    //   .getUsers().subscribe(res => {
    //     this.userList = res;
    //   },
    //   error => console.log(error)
    //   );

  }

  ngOnDestroy(): void {
    this.userListSubs.unsubscribe();
  }

  onClickList(e) {
    console.log(e.target.id);
    //DO THE SEACH WITH e.target.id QUE ES EL NOMBRE DEL PUEBLO
  }

}
