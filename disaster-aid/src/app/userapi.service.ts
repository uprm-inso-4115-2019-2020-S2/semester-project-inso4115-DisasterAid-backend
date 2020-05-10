import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserResponse } from './user-response';
import { LoginResult } from './login-result';


@Injectable({
  providedIn: 'root'
})
export class UserApiService {

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

   public getUsers():Observable<UserResponse> {
     return this.httpClient
     .get<UserResponse>(this.server + "DAD/users")
     .pipe(catchError (this._handleError));
   } 

   public getUserById(userID : String): Observable<UserResponse> {
    return this.httpClient
    .get<UserResponse>(this.server + `DAD/users/${userID}`)
    .pipe(catchError (this._handleError));
  }
  

  public login(username:String, password:String): Observable<LoginResult>{
    const httpOptions = {
      headers: new HttpHeaders ({
        'Content-Type':'application/json',
        'Accept': 'application/json'
      })
    };
    return this.httpClient
    .post<LoginResult>(this.server + "DAD/login", {username, password}, httpOptions)
    .pipe(catchError (this._handleError));
  }

  public logout():Observable<String>{
    return this.httpClient.get<String>(this.server+"DAD/logout")
    .pipe(catchError (this._handleError));
  }
  
  public createUser(user: User): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders ({
        'Content-Type':'application/json',
        'Accept': 'application/json'
      })
    };
    return this.httpClient
    .post(this.server + "DAD/users", user, httpOptions)
    .pipe(catchError (this._handleError));
  } 

  public editUser(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders ({
        'Content-Type':'application/json',
        'Accept': 'application/json'
      })
    };
    return this.httpClient
    .put(this.server + `DAD/users/${user.uid}`, user, httpOptions)
    .pipe(catchError (this._handleError));
  }

  public deleteUser(userid: String){
    return this.httpClient
    .delete(this.server + `DAD/users/${userid}`)
    .pipe(catchError (this._handleError));
  }
     
}
