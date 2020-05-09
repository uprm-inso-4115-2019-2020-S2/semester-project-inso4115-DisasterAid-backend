import { Component, OnInit } from '@angular/core';
import { Donation } from '../donation'
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {

  addDonationForm;

  showAddDonationForm: Boolean = false;

  // mock list. in reality it would get loaded with db donations (GET all donations)
  public donationsList: Donation[] = [
    {
      did: 1,
      supplyName: 'Water',
      quantity: 10,
      time: {hours: 12, minutes: 12},
      unit: '8oz bottles'
    },
    {
      did: 2,
      supplyName: 'Toilet Paper',
      quantity: 5,
      time: {hours: 12, minutes: 12},
      unit: 'Rolls'
    },
    {
      did: 3,
      supplyName: 'Granola Bars',
      quantity: 8,
      time: {hours: 12, minutes: 12},
      unit: 'Boxes of 12'
    }
  ]

  location = 'Arecibo'  // only field that comes from user and not donation. (FETCH user.location)

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.addDonationForm = this.formBuilder.group({
      supplyName: '',
      quantity: '',
      unit: '',
    });
   }

  ngOnInit(): void {
  }

  toggleAddDonation() {
    console.log("add btn clicked");
    this.showAddDonationForm = !this.showAddDonationForm;
  }

  onAddDonationSubmit(donationData) {
    this.addDonationForm.reset();

    // here it is getting pushed to the array to be displayed but also needs to be pushed to db (POST new donation)
    this.donationsList.push({
      did: this.donationsList.length + 1,
      supplyName: donationData.supplyName,
      quantity: donationData.quantity,
      time: {hours: 12, minutes: 12},
      unit: donationData.unit
    });

    console.warn('donation added: ', donationData);    

  }

}
