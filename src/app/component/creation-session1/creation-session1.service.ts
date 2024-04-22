import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CreationSession1Service {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }
//maka authorization
private getHeaders(): HttpHeaders {
  const token = sessionStorage.getItem('token');  // Replace with your token retrieval logic

  if (token) {
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  } else {
    // Handle the case where no token is found (e.g., throw an error or redirect to login)
    throw new Error('No authorization token found');
  }
}

  post(formData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.baseUrl+'cdg/session/create', formData,{headers});
  }}