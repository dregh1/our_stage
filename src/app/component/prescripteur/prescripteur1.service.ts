import { Injectable } from '@angular/core';
import { Titre } from 'src/app/models/titre';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brouillon } from 'src/app/models/Brouillon'; 
import { Demande } from 'src/app/models/Demande';
@Injectable({
  providedIn: 'root'
})
export class Prescripteur1Service {
  private url = 'http://localhost:8080';

  private baseUrl = 'http://localhost:8080/teste';
  private baseUrl2 = 'http://localhost:8080/prescripteur';
 
  constructor(private http: HttpClient) { }

//maka titre
  getTitre(): Observable<Titre[]> {
    return this.http.get<Titre[]>(this.baseUrl2+'/titre/get');
  }
  //maka demande
  getdemande(id:number): Observable<Demande> {
    return this.http.get<Demande>(`${this.baseUrl2}/demande/${id}`);
  }
  //Ajout titre

posttitre(formData: any): Observable<any> {
  return this.http.post<any>(this.baseUrl2+'/titre/create',formData);
}
  // maka ny brouillon
getBrouillonbyId(id:number):  Observable<Brouillon> {
  return this.http.get<Brouillon>(`${this.baseUrl2}/brouillon/${id}`);
}
//modication demande
update(id:number,data:any):Observable<any>{
  return this.http.put<any>(`${this.baseUrl2}/demande/${id}`,data);
}
//suppression
delete(id:number):Observable<any>{
  return this.http.delete<Brouillon>(`${this.baseUrl2}/brouillon/${id}`);
}
//recherche
searchByName(name:any):Observable<any>{
  return this.http.get<any>(`${this.baseUrl2}/brouillon/?name=${name}`);
}
}
