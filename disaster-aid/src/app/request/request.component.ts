import {Component} from '@angular/core';
import {Request} from '../request';
import {FormBuilder} from '@angular/forms';

// @ts-ignore
@Component({ selector: 'app-request',
  templateUrl: 'request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {

  addRequestForm;
  showRequestForm = false;

  // mock list. in reality it would get loaded with db donations (GET all donations)
  public requestList: Request[] = [
    {
      did: 1,
      supplyName: 'Water',
      description: 'Pain',
      quantity: 10,
      time: {hours: 12, minutes: 12},
      status: false,
    },
    {
      did: 2,
      supplyName: 'Paper',
      description: 'Bloated',
      quantity: 10,
      time: {hours: 12, minutes: 12},
      status: true,
    },
    {
      did: 3,
      supplyName: 'Granola ',
      description: 'Chapstick',
      quantity: 10,
      time: {hours: 12, minutes: 12},
      status: true,
    }
  ];

  location = 'Arecibo';  // only field that comes from user and not donation. (FETCH user.location)

constructor( private formBuilder: FormBuilder, ) {
  this.addRequestForm = this.formBuilder.group(
    {
      supplyName: '',
      quantity: '',
      status: '',
    }
  );
}
  toggleAddRequest() {
  console.log('Add button clicked');
  this.showRequestForm = !this.showRequestForm;
}

onAddRequestSubmit(requestData) {
  this.addRequestForm.reset();


// here it is getting pushed to the array to be displayed but also needs to be pushed to db (POST new donation)
  this.requestList.push({
    did: this.requestList.length + 1,
    supplyName: requestData.supplyName,
    quantity: requestData.quantity,
    description: requestData.description,
    time: {hours: 12, minutes: 12},
    status: requestData.status,
  });

  console.warn('donation added: ', requestData);

}

}
