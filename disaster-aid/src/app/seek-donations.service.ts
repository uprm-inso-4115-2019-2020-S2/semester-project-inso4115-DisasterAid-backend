import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { UserResponse } from './user-response';
import { catchError } from 'rxjs/operators';
import { LoginResult } from './login-result';
import { User } from './user';
import { DonationResponse } from './donation-response';
import { Donation } from './donation';
import { SeekResponse } from './seek-response';

@Injectable({
  providedIn: 'root'
})
export class SeekDonationsService {
  
  constructor(private httpClient:HttpClient) { }

  private _handleError(error: HttpErrorResponse | any) {
    let data = {};
                data = {
                    reason: error && error.error.message ? error.error.message : '',
                    status: error.status
                };
                console.error(data);
                return throwError(error);
  }

    public server:String = " http://localhost:5000/";

   public seekDonations(mySearch?:String):Observable<SeekResponse> {
     if(mySearch==''){ mySearch = 'available';} 
     return this.httpClient
     .get<SeekResponse>(this.server + `DAD/donations?search=${mySearch}`)
     .pipe(catchError (this._handleError));
   } 


  public editDonationQuantity(donation: Donation): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders ({
        'Content-Type':'application/json',
        'Accept': 'application/json'
      })
    };
    return this.httpClient
    .put(this.server + `DAD/donations/${donation.did}`, donation)
    .pipe(catchError (this._handleError));
  }

  public getDonationByID(donationID: number):Observable<DonationResponse>{
    return this.httpClient.get<DonationResponse>(this.server+`DAD/donations/${donationID}`)
    .pipe(catchError (this._handleError));
  }

  public searchByCity(cityName: String):Observable<SeekResponse>{
    return this.httpClient.get<SeekResponse>(this.server+`DAD/donations?city=${cityName}`)
    .pipe(catchError (this._handleError))
  }

  public searchBySupplyName(supplyName: String):Observable<SeekResponse>{
    return this.httpClient.get<SeekResponse>(this.server+`DAD/donations?supply=${supplyName}`)
    .pipe(catchError (this._handleError))
  }


    
}
