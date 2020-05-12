import { Component, OnInit } from '@angular/core';
import { Donation } from '../donation'
import { FormBuilder, FormGroup } from '@angular/forms';
import { DonationsService } from '../donations.service'
import { UserApiService } from '../userapi.service'

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {

  addDonationForm: FormGroup;
  editDonationForm: FormGroup;

  currentEditingID;

  showAddDonationForm: Boolean = false;
  showEditDonationForm: Boolean = false;

  donationsList: Donation[] = [];

  location: string;  // only field that comes from user and not donation. (FETCH user.location)

  currentUserID: string;

  constructor(
    private formBuilder: FormBuilder, private donationsService: DonationsService, private userService: UserApiService
  ) {
    this.addDonationForm = this.formBuilder.group({
      supplyName: '',
      quantity: '',
      unit: '',
    });

    this.editDonationForm = this.formBuilder.group({
      supplyName: '',
      quantity: '',
      unit: '',
    });
   }

  ngOnInit(): void {
    this.getCurrentUserID()
    this.getDonations();
    this.getLocation();
  }

  toggleAddDonation() {
    this.showAddDonationForm = !this.showAddDonationForm;
  }

  onAddDonationSubmit(donationData) {
    

    const donationToAdd: Donation = {
      supplyName :donationData.supplyName,
      quantity: donationData.quantity,
      unit: donationData.unit,
      createdAt: new Date(Date.now()),
      uid: +this.currentUserID,
      user: +this.currentUserID
    }

    this.donationsService.addDonation(donationToAdd)
    .subscribe(data => { this.donationsService.getDonations(), this.addDonationForm.reset(); this.ngOnInit(); },
    error => console.error(error));

    console.warn('donation added: ', donationData);
    console.warn('list added: ', this.donationsList);


  }

  getDonations(): void {
    this.donationsService.getUserDonations(this.currentUserID)
    .subscribe(donations => {
      console.log(donations);
      this.donationsList = donations.donation;
    }, error=> console.error(error))
  }

  getLocation(): void {
    this.userService.getUserById(this.currentUserID)
    .subscribe(user => {
      this.location = user.user.city as string
    }, error => console.error(error))
  }

  getCurrentUserID(){
    this.currentUserID = localStorage.getItem('loggedInUserID');

  }

//    EDIT

  toggleEditDonationCancel() {
    console.log("edit cancel btn clicked");
    this.showEditDonationForm = !this.showEditDonationForm;
  }

  toggleEditDonation(did){

    console.log("edit btn clicked");
    console.log(did);

    this.showEditDonationForm = !this.showEditDonationForm;

    for(let i = 0; i < this.donationsList.length; i++){
      if(this.donationsList[i].did == did){
        this.currentEditingID = did;
        console.log("current: ", this.currentEditingID);
        console.log(this.donationsList[i].did);
        this.editDonationForm.controls['supplyName'].setValue(this.donationsList[i].supplyName);
        this.editDonationForm.controls['quantity'].setValue(this.donationsList[i].quantity);
        this.editDonationForm.controls['unit'].setValue(this.donationsList[i].unit);
      }
    }
  }

  onEditDonationSubmit(values) {
    this.editDonationForm.reset();

    let donationToEdit: Donation = {
      supplyName: values.supplyName,
      quantity: values.quantity,
      unit: values.unit,
      uid: +this.currentUserID,
      user: +this.currentUserID,
      createdAt: new Date(Date.now())

    }

      for(let i = 0; i < this.donationsList.length; i++){
      console.warn('List did: ', this.donationsList[i].did);
      if(this.donationsList[i].did == this.currentEditingID){
        console.log("current: ", this.currentEditingID);
        this.donationsList[i].supplyName = values.supplyName;
        this.donationsList[i].quantity = values.quantity;
        this.donationsList[i].unit =  values.unit;
      }
    }

    this.donationsService.editDonation(donationToEdit, this.currentEditingID)
    .subscribe(data => { 
      console.log(data);
      this.getDonations();
      this.ngOnInit();
    }, error=> console.error(error));

    console.warn('Values did: ', values);
  }

}
