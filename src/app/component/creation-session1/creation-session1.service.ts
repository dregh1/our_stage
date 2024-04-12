import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CreationSession1Service {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }


  post(formData: any): Observable<any> {
    
    return this.http.post<any>(this.baseUrl+'cdg/session/create', formData);
  }}