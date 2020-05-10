import { Component, OnInit } from '@angular/core';
import { Donation } from '../donation'
import { FormBuilder, FormGroup } from '@angular/forms';

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

  // mock list. in reality it would get loaded with db donations (GET all donations)

  donationsList: Donation[] = [
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

  constructor(private formBuilder: FormBuilder,) {
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

  }

  get supplyName(){
    return this.addDonationForm.get('supplyName').value;
  }

  get quantity(){
    return this.addDonationForm.get('quantity').value;
  }

  get unit(){
    return this.addDonationForm.get('unit').value;
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
    console.warn('list added: ', this.donationsList);


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

    console.warn('Values did: ', values);

    for(let i = 0; i < this.donationsList.length; i++){
      console.warn('List did: ', this.donationsList[i].did);
      if(this.donationsList[i].did == this.currentEditingID){
        console.log("current: ", this.currentEditingID);
        this.donationsList[i].supplyName = values.supplyName;
        this.donationsList[i].quantity = values.quantity;
        this.donationsList[i].unit =  values.unit;
      }
    }
  }

}
