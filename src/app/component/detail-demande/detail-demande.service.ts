import { Injectable } from '@angular/core';
import { Titre } from 'src/app/models/TitreDepense';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brouillon } from 'src/app/models/Brouillon'; 
import { Demande } from 'src/app/models/Demande';
import { Periode } from 'src/app/models/Periode';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { Active } from 'src/app/models/Active';
import { Rubrique } from 'src/app/models/Rubrique';

@Injectable({
  providedIn: 'root'
})
export class DetailDemandeService {
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
  // maka ny brouillon
  getActiveId(id:number):  Observable<Active> {
    return this.http.get<Active>(`${this.baseUrl2}/active_dmd/${id}`);
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
// maka periode
  getPeriode(): Observable<Periode[]> {
    return this.http.get<Periode[]>(this.baseUrl+'/periode/get');
  }
  // maka periode
  getFournisseur(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.baseUrl+'/fournisseur/get');
  }
  // maka rubrique
getRubrique(): Observable<Rubrique[]> {
  return this.http.get<Rubrique[]>(this.baseUrl2+'/rubrique/get');
}
//avis cdg
postCdg(id:number,formData: any): Observable<any> {
  return this.http.post<any>(this.baseUrl2+'/titre/create',formData);
}
}
