import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserApiService } from '../userapi.service';
import {Subscription} from 'rxjs/Subscription';
import { User } from '../user';
import { Supply } from '../supply';

import { User1} from '../user';
import { Router } from '@angular/router';
import { DonationsService } from '../donations.service';
import { Donation } from '../donation';
import { MyRequest } from '../my-request';
import { RequestApiService } from '../request-api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  userListSubs: Subscription;
  userList : User[];
  loggedInUser: User;
  mySuppliesList: Donation[] = [];


  pending = [new User1(1, 'Carlos J. Ayala'), new User1(2, 'Javier'), new User1(2, 'Javier')
  , new User1(2, 'Javier'), new User1(2, 'Javier'), new User1(2, 'Javier'), new User1(2, 'Javier')
  , new User1(2, 'Javier'), new User1(2, 'Javier'), new User1(2, 'Javier'), new User1(2, 'Javier')];  //FOR TESTING
  delivered = [new User1(3, 'Juan Del Pueblo'), new User1(4, 'Los $1200')];  //FOR TESTING
  numOfRequests : number; //Displays the number of requests in the home page
  numOfDonations:number; //Displays the number of donations in the home page

  constructor(private userApi: UserApiService, private router: Router, 
    private donationApi: DonationsService, private requestsApi: RequestApiService) { }
  
  //Mock data; in practicality, these will be loaded with the info from db. 
  //user type should be User
  user = {
    firstName: this.loggedInUser? this.loggedInUser.firstName : '',
    lastName: this.loggedInUser? this.loggedInUser.lastName : ''
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
 

  //mock resources list (to be loaded from db)
  //List should be of type Supply[]
  //Para los supplies la lista es : food, water, blankets, clothes, medicine, batteries y tools
  // OJO - para que funcionen las fotos los names tienen que empezar con lowercase
  incomingRequestsList: MyRequest[] = [];

  ngOnInit(): void {

    if(localStorage.getItem('loggedInUserID') == null){ this.router.navigate(['/login'])}

    this.userApi
      .getUserById(localStorage.getItem('loggedInUserID')).subscribe(res => {
        this.loggedInUser = res.user;
        this.user.firstName = res.user.firstName;
        this.user.lastName = res.user.lastName;
      },
      error => console.log(error)
      );

      this.getThisUsersDonations();

  }

  ngOnDestroy(): void {
    
    }

  onClickList(e) {
    console.log(e.target.id);
    //DO THE SEACH WITH e.target.id QUE ES EL NOMBRE DEL PUEBLO
    window.location.href = '/donations/'+String(e.target.id)
    //window.location.href = '/donations'
  }

  logout(){
    console.warn("Stepping out, bye.")
    this.userApi.logout().subscribe(
      res =>{
        localStorage.removeItem('loggedInUserID'),
        this.router.navigate(['/landing_page'])
      }, error => console.error(error)
       )
    // Add this.auth.logout(); HERE
  }

  getThisUsersDonations(){
    this.donationApi.getUserDonations(localStorage.getItem('loggedInUserID')).subscribe(
      res=> {
        this.mySuppliesList = res.donation;
        this.numOfDonations = res.donation.length;
        this.populateIncomingRequestList();
      }, error=> console.error(error)
    )
  }

  populateIncomingRequestList(){
    this.mySuppliesList.forEach(supply =>
      supply.requests.forEach(item =>  this.incomingRequestsList.push(item))
      );
      this.numOfRequests = this.incomingRequestsList.length;
}


 
  
  acceptRequest(requestId: string){

    console.log(requestId);
     this.requestsApi.getRequestById(requestId).subscribe(
       res => {
         console.log(res)
         const rte:MyRequest = {
          rId: +requestId,
          supplyName: res.requests.supplyName,
          time: res.requests.time,
          status: true,
          description: res.requests.description,
          donation: res.requests.donation,
          user: res.requests.user,
          uid: res.requests.uid,
          did: res.requests.did
         }

         this.editDonationAmount(rte.did+'');
         this.saveChangesRequest(rte);
         
       }, error => console.error(error)
     )
  }


  private editDonationAmount(donationID:string){
    this.donationApi.getDonationById(donationID).subscribe(
      don=> {
        const dte:Donation ={
          did: +donationID,
          supplyName: don.supplyName,
          quantity: 0,
          createdAt: don.createdAt,
          unit: don.unit,
          uid: don.uid,
          user: don.user,
          city: don.city
        }
        this.saveChangesDonation(dte);
      }, error => console.error(error)
    )
  }

  private saveChangesDonation(don: Donation){
    this.donationApi.editDonation(don).subscribe(error=>console.error(error))
  }

  private saveChangesRequest(req: MyRequest){
    console.log(req);
    this.requestsApi.editRequest(req).subscribe(res=> console.log(res),error=>console.error(error))
  }

}
