import { Injectable } from '@angular/core';
import { Donation } from './donation';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DonationResponse } from './donation-response';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {

  constructor(private httpClient:HttpClient) { }

  private _handleError(error: HttpErrorResponse | any) {
    let data = {};
                data = {
                    reason: error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                console.error(data);
                return throwError(error);
  }

  public server:String = "http://localhost:5000/"

  public getDonations(): Observable<Donation[]> {
    return this.httpClient
    .get<Donation[]>(this.server + "DAD/donations")
    .pipe(catchError(this._handleError));
  }

  public getDonationById(donationID: String): Observable<Donation> {
    return this.httpClient
    .get<Donation>(this.server + `DAD/donations/${donationID}`)
    .pipe(catchError(this._handleError));
  }

  public addDonation(donation: Donation): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders ({
        'Content-Type':'application/json',
        'Accept': 'application/json'
      })
    };

    return this.httpClient
    .post(this.server + "DAD/donations", donation, httpOptions)
    .pipe(catchError (this._handleError));
  }

  public deleteDonation(donationID: String): Observable<any> {
    return this.httpClient
    .delete(this.server + `DAD/donations/${donationID}`)
    .pipe(catchError (this._handleError))
  }

  public editDonation(donation: Donation, did:string): Observable<any> {
    const httpOptions = { 
      headers: new HttpHeaders ({
        'Content-Type': 'applications/json' ,
        'Accept': 'application/json'    
      })
    };
    console.warn(donation);
    return this.httpClient
    .put(this.server+ `DAD/donations/${did}`, donation)
    .pipe(catchError (this._handleError))
  }

  public getUserDonations(userID: String): Observable<DonationResponse> {
    return this.httpClient
    .get<DonationResponse>(this.server + `DAD/donations/user/${userID}`)
    .pipe(catchError(this._handleError));
  }
}
