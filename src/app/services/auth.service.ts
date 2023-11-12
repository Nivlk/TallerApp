import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environments';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({providedIn: 'root'})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private roleSubject = new BehaviorSubject<string>('');

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  role$ = this.roleSubject.asObservable();

    private apiServerUrl = environment.apiUserUrl;

    constructor(private http: HttpClient) {}

    public register(user : User): Observable<User> {
  //let path = '/api/v1/auth/register';
  let path = '/api/auth/signup';
      return this.http.post<User>(this.apiServerUrl + path, user, httpOptions)
       .pipe(
        catchError((error) => {
          console.log('Error:', error);
          return this.handleError(error, path);
        })
      );
    }
    updateLoginStatus(isLoggedIn: boolean, role: string): void {
      this.isLoggedInSubject.next(isLoggedIn);
      this.roleSubject.next(role);
      console.log( isLoggedIn)
      console.log( role)
    }
    public authenticate(credentials: any): Observable<any> {
      //let path = '/api/v1/auth/authenticate';
      let path = '/api/v1/auth/authenticate';
      return this.http.post(this.apiServerUrl + path, {
        email: credentials.username,
        password: credentials.password
      }, httpOptions).pipe(
        catchError((error:any) => {
          console.log('Error:', error);
          return this.handleError(error, path);
        })
      );
    }

    public handleError(error: any, path: string): Observable<never> {
      let errorMessage = 'An error occurred. Please try again later.';
      
      if (error instanceof HttpErrorResponse) {
        switch (path) {
          case '/api/v1/auth/register':
            if (error.status === 400) {
              errorMessage = 'User with this username already exist! Please try again.';
            } 
            break;

          case '/api/v1/auth/authenticate':
            if (error.status === 400) {
              errorMessage = 'Invalid authentication credentials. Please try again.';
            } else if (error.status === 403) {
              errorMessage = 'You are not authorized to perform this action.';
            } 
            break;

          default:
            errorMessage = 'An error occurred. Please try again later.';
            break;
        }
      } 
      return throwError(errorMessage);
    }

}