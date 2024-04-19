import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DetailDemande } from 'src/app/models/DetailDemande';

@Injectable({
  providedIn: 'root'
})
export class MenuDemandeService {
  private url = 'http://localhost:8080';

  private baseUrl = 'http://localhost:8080/cdg';
  private baseUrl2 = 'http://localhost:8080/prescripteur';
 
  constructor(private http: HttpClient) { }
  // maka ny brouillon
getBrouillon():  Observable<DetailDemande[]> {
  return this.http.get<DetailDemande[]>(this.baseUrl+'/detailDemande/get');
}
}