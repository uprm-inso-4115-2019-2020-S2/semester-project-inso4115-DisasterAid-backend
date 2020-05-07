import { Component, OnInit } from '@angular/core';
import { Donation } from '../donation'

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {

  mockDonation: Donation = {
    did: 1,
    supplyName: 'Water',
    quantity: 10,
    time: {hours: 12, minutes: 12},
    unit: '8oz bottles'
  }

  mockDonationsList: Donation[] = [
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

  location = 'Arecibo'  // only field that comes from user and not donation

  constructor() { }

  ngOnInit(): void {
  }

}
