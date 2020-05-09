import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
providedIn: 'root'
})
export class UserApiService {

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

   public getUsers() : Observable<User[]> {
     return this.httpClient
     .get<User[]>(this.server + "DAD/users")
     .pipe(catchError (this._handleError));
   }

   public getUser(userID : String): Observable<User> {
    return this.httpClient
    .get<User>(this.server + `DAD/users/${userID}`)
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
    .pipe(catchError (this._handleError));;
  }

   public logIn(user: string, password: string) {
           return this.http.post<any>('/api/authenticate', { username: username, password: password })
               .map(user => {
                   if (user && user.token) {
                       localStorage.setItem('currentUser', JSON.stringify(user));
                   }

                   return user;
               });
       }

    public logOut() {
           localStorage.removeItem('currentUser');
       }

     getCurrentUser(): User {
       return this.currentUserSubject.value;
     }
}
