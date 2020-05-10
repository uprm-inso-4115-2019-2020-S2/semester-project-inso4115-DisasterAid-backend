import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, from } from 'rxjs';
import { RequestResponse } from './request-response';
import {Request } from './request'
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestApiService {

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

    public server:String = " http://localhost:5000/";

   public getRequestByUserId(userId: String):Observable<RequestResponse> {
     return this.httpClient
     .get<RequestResponse>(this.server + `DAD/request/${userId}`)
     .pipe(catchError (this._handleError));
   }
   
   public createRequest(request: Request): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders ({
        'Content-Type':'application/json',
        'Accept': 'application/json'
      })
    };
    return this.httpClient
    .post(this.server + "DAD/requests", request, httpOptions)
    .pipe(catchError (this._handleError));
  }
  
  public editRequest(request: Request): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders ({
        'Content-Type':'application/json',
        'Accept': 'application/json'
      })
    };
    return this.httpClient
    .put(this.server + `DAD/users/${request.rId}`,request , httpOptions)
    .pipe(catchError (this._handleError));
  }
  
  //DELETE REQUEST
     
}
