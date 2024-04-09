import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Brouillon } from 'src/app/models/Brouillon';
import { Active_dmd } from 'src/app/models/Active_dmd';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private url = 'http://localhost:8080';

  private baseUrl = 'http://localhost:8080/teste';
  private baseUrl2 = 'http://localhost:8080/prescripteur';
 
  constructor(private http: HttpClient) { }
  // maka ny brouillon
getBrouillon():  Observable<Brouillon[]> {
  return this.http.get<Brouillon[]>(this.baseUrl2+'/brouillon/get');
}
getdmdactive():  Observable<Active_dmd[]> {
  return this.http.get<Active_dmd[]>(this.baseUrl2+'/active_dmd/get');
}
}
