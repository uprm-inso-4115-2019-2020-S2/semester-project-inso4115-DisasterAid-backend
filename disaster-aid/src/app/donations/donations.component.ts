import { Component, OnInit } from '@angular/core';
import { Donation } from '../donation'
import { FormBuilder } from '@angular/forms';
import { DonationsService } from '../donations.service'
import { UserApiService } from '../userapi.service'

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {

  addDonationForm;

  showAddDonationForm: Boolean = false;

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
    this.addDonationForm.reset();

    this.donationsService.addDonation(donationData);

    console.warn('donation added: ', donationData);    

  }

  getDonations(): void {
    this.donationsService.getUserDonations(this.currentUserID)
    .subscribe(donations => {
      this.donationsList = donations as Donation[]
    })
  }

  getLocation(): void {
    this.userService.getUser(this.currentUserID)
    .subscribe(user => {
      this.location = user.city as string
    })
  }

  //// NOTE: NEVER GOT A WAY TO GET CURRENT USERS ID FROM THAT TEAM so it is hardcoded as 1
  getCurrentUserID(){
    this.currentUserID = "1"
  }

}
