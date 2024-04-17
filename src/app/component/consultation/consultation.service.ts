import { Injectable } from '@angular/core';
import  { Fournisseur } from 'src/app/models/Fournisseur';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private url = 'http://localhost:8080';

  private baseUrl = 'http://localhost:8080/teste';
  private baseUrl2 = 'http://localhost:8080/prescripteur';
 
  constructor(private http: HttpClient) { }
 // maka periode
  getFournisseur(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.baseUrl+'/fournisseur/get');
  }
}
