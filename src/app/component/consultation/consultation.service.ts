import { Injectable } from '@angular/core';
import  { Fournisseur } from 'src/app/models/Fournisseur';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private url = 'http://localhost:8080';

  private baseUrl = 'http://localhost:8080/teste';
  private baseUrl2 = 'http://localhost:8080/prescripteur';
 
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
 // maka periode
  getFournisseur(): Observable<Fournisseur[]> {
    const headers = this.getHeaders();
    return this.http.get<Fournisseur[]>(this.baseUrl+'/fournisseur/get',{headers});
  }
}
