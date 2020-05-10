import { Injectable } from '@angular/core';
import { Donation } from './donation';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {

  // mock list. in reality it would get loaded with db donations (GET all donations)
  public donationsList: Donation[] = [
    {
      did: 1,
      supplyName: 'Water',
      quantity: 10,
      time: { hours: 12, minutes: 12 },
      unit: '8oz bottles'
    },
    {
      did: 2,
      supplyName: 'Toilet Paper',
      quantity: 5,
      time: { hours: 12, minutes: 12 },
      unit: 'Rolls'
    },
    {
      did: 3,
      supplyName: 'Granola Bars',
      quantity: 8,
      time: { hours: 12, minutes: 12 },
      unit: 'Boxes of 12'
    }
  ]

  constructor() { }

  getDonations(): Donation[] {
    return this.donationsList;
  }

  getDonationById(id: number): Donation {
    // return donation based on id
    let dummyDonationToReturn: Donation = {
      did: 1,
      supplyName: 'Water',
      quantity: 10,
      time: { hours: 12, minutes: 12 },
      unit: '8oz bottles'
    }
    return dummyDonationToReturn;
  }

  addDonation(donation: Donation): void {
    // here it is getting pushed to the array to be displayed but also needs to be pushed to db (POST new donation)
    this.donationsList.push({
      did: this.donationsList.length + 1,
      supplyName: donation.supplyName,
      quantity: donation.quantity,
      time: { hours: 12, minutes: 12 },
      unit: donation.unit
    });
    
  }

  deleteDonation(id: number){
    return this.httpClient
    .delete(this.server +'DAD/donations/id/${donation.id}')
    .pipe(catchError (this._handleError))
  }

  editDonation(donation: Donation): void {
    // using donation id, update the other fields
    const httpOptions = { 
      headers: new HttpHeaders ({
        'Content-Type': 'applications/json',
        'Accept': 'application/json'
      })
    };
    return this.httpClient
    .put(this.server+'DAD/donations/id/${donation.did}', donation, httpOptions)
    .pipe(catchError (this._handleError))
  }
}
