import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timestamp } from 'rxjs';
import { Periode } from 'src/app/models/Periode';
import { Rubrique } from 'src/app/models/Rubrique';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { Titre } from 'src/app/models/TitreDepense';
import { Demande } from 'src/app/models/Demande';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CreationPrescripteurService {
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
  // maka ny _ periode_demande
  // session_cd = {
  //   id   : Number,
  //   ref      :String,
  //   date_cloture      :timestamp,
  //   is_deleted  : Boolean,
  //   id_direction  : Number,  
  //   taux_eur  : Number,
  //   taux_usd  : Number,
  //   taux_gbp  :Number,
  //   taux_mga  :Number,
  //   is_closed :Boolean
  // }
  
// maka titre
 getTitre(): Observable<Titre[]> {
  const headers = this.getHeaders();
   return this.http.get<Titre[]>(this.baseUrl2+'/titre/get',{headers});
 }
//Ajout titre

posttitre(formData: any): Observable<any> {
  const headers = this.getHeaders();
  return this.http.post<any>(this.baseUrl2+'/titre/create',formData,{headers});
}

// maka periode
  getPeriode(): Observable<Periode[]> {
    const headers = this.getHeaders();
    return this.http.get<Periode[]>(this.baseUrl+'/periode/get',{headers});
  }
  
// maka rubrique
getRubrique(): Observable<Rubrique[]> {
  const headers = this.getHeaders();
  return this.http.get<Rubrique[]>(this.baseUrl2+'/rubrique/get',{headers});
}



// maka ny brouillon

// maka ny brouillon


  //  CREATE DEMANDE
createDemande(formData: any): Observable<any> {
  const headers = this.getHeaders();
    return this.http.post<any>(this.baseUrl+'/demande/create', formData,{headers});
  }
  
  post(formData: any): Observable<any> {
      const headers = this.getHeaders();
    return this.http.get<any>(this.baseUrl+'/get',{headers});
  }

  // set commentaire achat
  setComsAchat(formData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.baseUrl2+'/achat/commentaire/create', formData,{headers});
  }
 

  // // maka ny reference
  // getReference():  Observable<FormData[]> {
  //   return this.http.get<FormData[]>(this.baseUrl2+'/reference/get'); 
  //  }
   //maj demande
   updateDemande(demande:Demande):Observable<Demande[]>{
    const headers = this.getHeaders();
    return this.http.put<Demande[]>(this.baseUrl2+'/achat/commentaire/create', demande.id,{headers});
   }
   //delete demad
   deleteDemande(DemandeId:number):Observable<void>{
    const headers = this.getHeaders();
    return this.http.delete<void>(this.baseUrl2+'/achat/commentaire/create'+ DemandeId,{headers});
   }
   //aiche par detail
   getDemandeById(DemandeId:number):Observable<Demande>{
    const headers = this.getHeaders();
    return this.http.get<Demande>(this.baseUrl2+'/achat/commentaire/create'+ DemandeId,{headers});
   }
}
