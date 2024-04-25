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
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  private url = 'http://localhost:8080';
  private baseUrl = 'http://localhost:8080/teste';
  private baseUrl4 = 'http://localhost:8080/achat';
  private baseUrl3 = 'http://localhost:8080/cdg';
  private baseUrl2 = 'http://localhost:8080/prescripteur';
  //private baseUrl= 'http://localhost:8080/cdg';
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
// maka ny brouillon
getBrouillon():  Observable<DetailDemande[]> {
const headers = this.getHeaders();
return this.http.get<DetailDemande[]>(this.baseUrl+'/detailDemande/get',{headers});
}



// maka periode
getPeriode(): Observable<Periode[]> {
  const headers = this.getHeaders();
  return this.http.get<Periode[]>(this.baseUrl+'/periode/get',{headers});
}
//modication demande
update(id:number,data:any):Observable<any>{
  const headers = this.getHeaders();
  return this.http.put<any>(`${this.baseUrl2}/demande/${id}`,data,{headers});
}
//maka demande
getdemande(id:number): Observable<Demande> {
  const headers = this.getHeaders();
  return this.http.get<Demande>(`${this.baseUrl2}/demande/${id}`,{headers});
}
// maka commentaire cd
// getcomsCdByid(id:number):  Observable<DetailDemande> {
//   const headers = this.getHeaders();
//   return this.http.get<Decision>(`${this.baseUrl4}/decision/${id}`,{headers});
// }
// // maka commentaire cd all
// getcomsCd():  Observable<DetailDemande> {
//   const headers = this.getHeaders();
//   return this.http.get<DetailDemande>(`${this.baseUrl4}/decision/get`,{headers});
// }
  //post commentaire
  // postCd(formData: any): Observable<any> {
  //   const headers = this.getHeaders();
  //   return this.http.post<any>(`${this.baseUrl4}/decision/create/`,formData,{headers});
  // }
  //modication demande
  // updateCd(id:number,data:any):Observable<any>{
  //   const headers = this.getHeaders();
  // return this.http.put<any>(`${this.baseUrl4}/decision/${id}`,data,{headers});
  // }
}
