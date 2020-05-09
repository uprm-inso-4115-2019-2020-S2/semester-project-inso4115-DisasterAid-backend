import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserApiService } from '../userapi.service';
import {Subscription} from 'rxjs/Subscription';
import { User } from '../user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  userListSubs: Subscription;
  userList : User[];

  constructor(private userApi: UserApiService) { }
  
  //Mock data; in practicality, these will be loaded with the info from db. 
  user = "John Doe"
  numOfDonations = 3
  numOfRequests = 7

  //mock pending list (should be loaded from db)
  public pendingNamesList: String[] = [
    "Juan Vargas", "Brian Lopez", "Julia Belinski", "Robert Acar"
  ]
  //mock delivered list (should be loaded from db)
  public deliveredNamesList: String[] = [
    "Natalie Cruz", "Michael Scott", "Albert Cruz"
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
    //DO THE SEACH WITH e.target.id
  }

}
