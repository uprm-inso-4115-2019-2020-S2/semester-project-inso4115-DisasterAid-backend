import { Component, OnInit } from '@angular/core';
import { Donation } from '../donation';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DonationsService } from '../donations.service';
import { UserApiService } from '../userapi.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {

  addDonationForm: FormGroup;
  editDonationForm: FormGroup;

  currentEditingID;

  // tslint:disable-next-line:ban-types
  showAddDonationForm: Boolean = false;
  // tslint:disable-next-line:ban-types
  showEditDonationForm: Boolean = false;

  donationsList: Donation[];

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
    this.getCurrentUserID();
    this.getDonations();
    this.getLocation();
  }

  toggleAddDonation() {
    this.showAddDonationForm = !this.showAddDonationForm;
  }

  onAddDonationSubmit(donationData) {

    this.donationsService.addDonation(donationData)
    .subscribe(data => {this.getDonations(); } ); 
    this.addDonationForm.reset();

    this.donationsService.addDonation(donationData);

    console.warn('donation added: ', donationData);
    console.warn('list added: ', this.donationsList);


  }

  getDonations(): void {
    this.donationsService.getUserDonations(this.currentUserID)
    .subscribe(donations => {
      this.donationsList = donations as Donation[];
    });
  }

  getLocation(): void {
    this.userService.getUser(this.currentUserID)
    .subscribe(user => {
      this.location = user.city as string;
    });
  }

  //// NOTE: NEVER GOT A WAY TO GET CURRENT USERS ID FROM THAT TEAM so it is hardcoded as 1
  getCurrentUserID() {
    this.currentUserID = localStorage.getItem('loggedInUserID');

  }

//    EDIT

  toggleEditDonationCancel() {
    console.log('edit cancel btn clicked');
    this.showEditDonationForm = !this.showEditDonationForm;
  }

  toggleEditDonation(did) {

    console.log('edit btn clicked');
    console.log(did);

    this.showEditDonationForm = !this.showEditDonationForm;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.donationsList.length; i++) {
      if (this.donationsList[i].did === did) {
        this.currentEditingID = did;
        console.log('current: ', this.currentEditingID);
        console.log(this.donationsList[i].did);
        // tslint:disable-next-line:no-string-literal
        this.editDonationForm.controls['supplyName'].setValue(this.donationsList[i].supplyName);
        // tslint:disable-next-line:no-string-literal
        this.editDonationForm.controls['quantity'].setValue(this.donationsList[i].quantity);
        // tslint:disable-next-line:no-string-literal
        this.editDonationForm.controls['unit'].setValue(this.donationsList[i].unit);
      }
    }
  }

  onEditDonationSubmit(values) {
    this.editDonationForm.reset();

    this.donationsService.editDonation(values)
    .subscribe(data => {this.getDonations(); } );

    console.warn('Values did: ', values);

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.donationsList.length; i++) {
      console.warn('List did: ', this.donationsList[i].did);
      if (this.donationsList[i].did === this.currentEditingID) {
        console.log('current: ', this.currentEditingID);
        this.donationsList[i].supplyName = values.supplyName;
        this.donationsList[i].quantity = values.quantity;
        this.donationsList[i].unit =  values.unit;
      }
    }
  }

}
