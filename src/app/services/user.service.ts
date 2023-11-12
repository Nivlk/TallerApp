import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';



import { environment } from 'src/environments/environments';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({providedIn: 'root'})
export class UserService {

    private apiServerUrl = environment.apiUserUrl;
    constructor(private http: HttpClient) {

  }



    public saveData(user : any): Observable<any> {
        return this.http.post<any>(this.apiServerUrl + '/swiggy/guardar', user);
    }
  
}