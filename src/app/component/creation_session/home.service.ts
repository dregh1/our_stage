import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



const httpsOptions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = 'http://localhost:8080/session';

  constructor(private http: HttpClient) { }


  post(formData: any): Observable<any> {
    
    return this.http.post<any>(this.baseUrl+'/create', formData);
  }

}
