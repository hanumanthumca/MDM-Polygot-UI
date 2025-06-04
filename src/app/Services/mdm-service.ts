import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable,BehaviorSubject,Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })

  export class MDMService {
    constructor(private http: HttpClient) {}
    //private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Example URL
    private apiUrl = 'http://localhost:3000/api/customerDetails';

  
    sendPostRequestToAPI(url :string,params:any){

        return this.http.post(url,params); 
    }
    getRequestForAPI(url:string,queryString:string): Observable<any> {
     // return this.http.get(this.apiUrl); 
      return this.http.get(url+queryString); // GET request
    }
  
    createUser(user: any): Observable<any> {
      return this.http.post(this.apiUrl, user); // POST request
    }
  }