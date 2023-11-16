import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environments';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class UserService {

  private apiServerUrl = environment.apiUserUrl;
  constructor(private http: HttpClient) {

  }

  public saveData(user: any): Observable<any> {
    return this.http.post<any>(this.apiServerUrl + '/swiggy/guardar', user);
  }

  // public getAllUsers(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiServerUrl}/api/v1/users/getUsers`).pipe(
  //     tap(_ => console.log('Datos obtenidos correctamente')),
  //     catchError(error => {
  //       console.error('Error al obtener datos', error);
  //       throw error;
  //     })
  //   );
  // }

  public getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/api/v1/users/getUsers`);
  }


}