import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, from } from 'rxjs';
import { RequestResponse } from './request-response';
import {MyRequest } from './my-request'
import { catchError } from 'rxjs/operators';
import { RequestByIdResponse } from './request-by-id-response';
import { RequestByUID } from './request-by-uid';

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

   public getRequestById(rId: String):Observable<RequestByIdResponse> {
     return this.httpClient
     .get<RequestByIdResponse>(this.server + `DAD/requests/${rId}`)
     .pipe(catchError (this._handleError));
   }
   
   public createRequest(request: MyRequest): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders ({
        'Content-Type':'application/json',
        'Accept': 'application/json'
      })
    };
    return this.httpClient
    .post(this.server + "DAD/requests", request)
    .pipe(catchError (this._handleError));
  }
  
  public editRequest(request: MyRequest): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders ({
        'Content-Type':'application/json',
        'Accept': 'application/json'
      })
    };
    return this.httpClient
    .put(this.server + `DAD/requests/${request.rId}`,request)
    .pipe(catchError (this._handleError));
  }

  public deleteRequest(requestID: String): Observable<any> {
        return this.httpClient
    .delete(this.server + `DAD/requests/${requestID}`)
    .pipe(catchError (this._handleError));
  }

  public getRequestByUserId(uId: String):Observable<RequestByUID> {
    return this.httpClient
    .get<RequestByUID>(this.server + `DAD/requests/user/${uId}`)
    .pipe(catchError (this._handleError));
  }

  public getAllRequests():Observable<RequestResponse> {
    return this.httpClient.get<RequestResponse>(this.server + "DAD/requests")
    .pipe(catchError (this._handleError))
  }
     
}
