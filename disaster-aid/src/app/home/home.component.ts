import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserApiService } from '../userapi.service';
import {Subscription} from 'rxjs/Subscription';
import { User } from '../user';
import { Supply } from '../supply';


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
  //user type should be User
  user = {
    firstName: "X AE A-12",
    lastName: "Musk"
  }

  numOfDonations = 3
  numOfRequests = 7

  //mock pending list (should be loaded from db)
  //List Type should be User
  pendingList = [
    {
      firstName: "Juan",
      lastName: "Vargas"
    },
    {
      firstName: "Brian",
      lastName: "Griffin"
    },
    {
      firstName: "Julia",
      lastName: "Belinski"
    },
    {
      firstName: "Robert",
      lastName: "Acar"
    }
  ]

  //mock delivered list (should be loaded from db)
  //List Type should be User.
  deliveredList = [
    {
      firstName: "Natalie",
      lastName: "Cruz"
    },
    {
      firstName: "Michael",
      lastName: "Scott"
    },
    {
      firstName: "Albert",
      lastName: "Cruz"
    },
    {
      firstName: "John",
      lastName: "Doe"
    }
  ]
  
  //mock supplies list (to be loaded from db)
  //List should be of type Supply[]
  mySuppliesList = [
    {
      name: "Water"
    },
    {
      name: "Apple Sauce"
    },
    {
      name: "Blankets"
    }
  ]

  //mock resources list (to be loaded from db)
  //List should be of type Supply[]
  myResourcesList: Supply[] = [
    {
      name: "Water",
      quantity: 17,
      location: "Arecibo"
    },
    {
      name: "Canned Beans",
      quantity: 23,
      location: "Quebradillas"
    },
    {
      name: "First Aid Kits",
      quantity: 4,
      location: "Naguabo"
    }
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
