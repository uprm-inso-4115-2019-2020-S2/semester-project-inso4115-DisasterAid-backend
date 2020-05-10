import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserApiService } from '../userapi.service';
import {Subscription} from 'rxjs/Subscription';
import { User } from '../user';
import { Supply } from '../supply';

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
  //user type should be User
  user = {
    firstName: "X AE A-12",
    lastName: "Musk"
  }

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
    },
    {
      firstName: "Elon",
      lastName: "Musk"
    },
    {
      firstName: "Peter",
      lastName: "Griffin"
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
      name: "tools",
    },
    {
      name: "batteries"
    },
    {
      name: "blanket"
    }
  ]

  //mock resources list (to be loaded from db)
  //List should be of type Supply[]
  //Para los supplies la lista es : food, water, blankets, clothes, medicine, batteries y tools
  // OJO - para que funcionen las fotos los names tienen que empezar con lowercase
  myResourcesList: Supply[] = [
    {
      name: "water",
      quantity: 17,
      location: "Arecibo"
    },
    {
      name: "food",
      quantity: 23,
      location: "Quebradillas"
    },
    {
      name: "medicine",
      quantity: 4,
      location: "Naguabo"
    },
    {
      name: "clothes",
      quantity: 4,
      location: "San Sebastian"
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
    //DO THE SEACH WITH e.target.id QUE ES EL NOMBRE DEL PUEBLO
    window.location.href = '/donations/'+String(e.target.id)
    //window.location.href = '/donations'
  }

}
