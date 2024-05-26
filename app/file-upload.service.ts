import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  

  constructor(private http:HttpClient){ }
  //Returns an Observable

 

  //upload(file:any): Observable<any>{
  //Create form data

  Getchartinfo(): Observable<any>{
    return this.http.get<any>("http://localhost:3000/predict");
  }

  //const formData = new FormData();
  //Store

  //formData.append("file", file, file.name);
  //return this.http.post( this.baseUrl, formData)


  }


//}
