import { Component, OnInit } from '@angular/core';
import { Donation } from '../donation'
import { FormBuilder } from '@angular/forms';
import { DonationsService } from '../donations.service'

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {

  addDonationForm;

  showAddDonationForm: Boolean = false;

  donationsList: Donation[];

  location = 'Arecibo'  // only field that comes from user and not donation. (FETCH user.location)

  constructor(
    private formBuilder: FormBuilder, private donationsService: DonationsService
  ) {
    this.addDonationForm = this.formBuilder.group({
      supplyName: '',
      quantity: '',
      unit: '',
    });
   }

  ngOnInit(): void {
    this.getDonations();
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
    this.donationsList = this.donationsService.getDonations();
  }

}
