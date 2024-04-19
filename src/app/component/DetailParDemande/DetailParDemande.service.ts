import { Injectable } from '@angular/core';
import { Titre } from 'src/app/models/TitreDepense';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from 'src/app/models/Demande';
import { Periode } from 'src/app/models/Periode';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { Rubrique } from 'src/app/models/Rubrique';
import {AvisCdg} from 'src/app/models/AvisCdg';
import { AvisAchat } from 'src/app/models/AvisAchat';
import { DetailDemande } from 'src/app/models/DetailDemande';
@Injectable({
  providedIn: 'root'
})
export class TesteService {
  private url = 'http://localhost:8080';

  private baseUrl = 'http://localhost:8080/teste';
  private baseUrl4 = 'http://localhost:8080/achat';
  private baseUrl3 = 'http://localhost:8080/cdg';
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
getDetailDemandebyId(id:number):  Observable<DetailDemande> {
  return this.http.get<DetailDemande>(`${this.baseUrl}/detailDemande/${id}`);
}
  // maka ny brouillon
  getActiveId(id:number):  Observable<DetailDemande> {
    return this.http.get<DetailDemande>(`${this.baseUrl2}/active_dmd/${id}`);
  }
//modication demande
update(id:number,data:any):Observable<any>{
  return this.http.put<any>(`${this.baseUrl2}/demande/${id}`,data);
}
//suppression
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


//////////// CDG/////////////////
 // maka ny coms cdg
  getCdgById(id:number):  Observable<AvisCdg> {
    return this.http.get<AvisCdg>(`${this.baseUrl3}/avisCdgByIdDemande/${id}`);
  }
  //avis cdg
postCdg(formData: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl3}/avisCdg/create/`,formData);
}
updateCdg(id:number,data:any):Observable<any>{
  return this.http.put<any>(`${this.baseUrl3}/avisCdg/${id}`,data);
}
 
///////////////Achat/////////
  // maka ny coms achat
  getAchatById(id:number):  Observable<AvisAchat> {
    return this.http.get<AvisAchat>(`${this.baseUrl4}/avisAchatByIdDemande/${id}`);
  }
   //avis achat
  postAchat(formData: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl4}/avisAchat/create`,formData);
  }
  //modication demande
  updateAchat(id:number,data:any):Observable<any>{
  return this.http.put<any>(`${this.baseUrl2}/avisCdg/${id}`,data);
  }
}
