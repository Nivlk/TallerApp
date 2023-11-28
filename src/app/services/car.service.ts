import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, finalize, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environments';

import { Observable, Observer, forkJoin } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { v4 as uuidv4 } from 'uuid';


@Injectable({ providedIn: 'root' })
export class CarService {

  private apiServerUrl = environment.apiUserUrl;
  constructor(private http: HttpClient,private storage: AngularFireStorage) {

  }  private basePath = '/images';
  imageUrls: any[] = [];


  pushFileToStorage(fileUploads: any[]): Observable<string[] | undefined> {
    const uploadObservables: Observable<string>[] = [];
  
    fileUploads.forEach((fileUpload) => {
      const uniqueFileName = uuidv4();
      const filePath = `${this.basePath}/${uniqueFileName}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, fileUpload);
  
      const uploadObservable = new Observable((observer: Observer<string>) => {
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe(
              (downloadURL) => {
                observer.next(downloadURL); // Emit individual download URL
                observer.complete();
                // this.saveFileData(fileUpload);
              },
              (error) => {
                observer.error(error); // Propagate the error
              }
            );
          })
        ).subscribe();
      });
  
      uploadObservables.push(uploadObservable);
    });
  
    return forkJoin(uploadObservables);
  }





  public saveData(car: any): Observable<any> {
    return this.http.post<any>(this.apiServerUrl + '/car/guardar', car);
  }
  public updateData(user: any): Observable<any> {
    return this.http.put<any>(this.apiServerUrl + '/api/v1/users/updateCustomer', user);
  }


  public getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/api/v1/users/getCustomers`);
  }


}