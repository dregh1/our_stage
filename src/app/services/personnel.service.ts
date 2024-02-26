import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personnel } from '../models/Personnel';




const httpsOptions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class PersonnelService {
  private baseUrl = 'http://localhost:8080/accueil';
  

 
  constructor(private http: HttpClient) { }
  
  get(): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(this.baseUrl+'/all');
  }

  post(formData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'/c', formData);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/d/${id}`);
  }

  update(id: number, newData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, newData);
  }

}
