import { Injectable } from '@angular/core';
import { Titre } from 'src/app/models/TitreDepense';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from 'src/app/models/Demande';
import { Periode } from 'src/app/models/Periode';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { Rubrique } from 'src/app/models/Rubrique';
import { AvisCdg } from 'src/app/models/AvisCdg';
import { AvisAchat } from 'src/app/models/AvisAchat';
import { DetailDemande } from 'src/app/models/DetailDemande';
import { HttpHeaders } from '@angular/common/http';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  private url = 'http://localhost:8080';
  private baseUrl = 'http://localhost:8080/teste';
  private baseUrl4 = 'http://localhost:8080/achat';
  private baseUrl3 = 'http://localhost:8080/cdg';
  private baseUrl2 = 'http://localhost:8080/prescripteur';
  //private baseUrl= 'http://localhost:8080/cdg';
  constructor(private http: HttpClient) {}
  //maka authorization
  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token'); // Replace with your token retrieval logic

    if (token) {
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    } else {
      // Handle the case where no token is found (e.g., throw an error or redirect to login)
      throw new Error('No authorization token found');
    }
  }
  // maka ny brouillon
  getBrouillon(): Observable<DetailDemande[]> {
    const headers = this.getHeaders();
    return this.http.get<DetailDemande[]>(this.baseUrl + '/detailDemande/get', {
      headers,
    });
  }

  // maka periode
  getPeriode(): Observable<Periode[]> {
    const headers = this.getHeaders();
    return this.http.get<Periode[]>(this.baseUrl + '/periode/get', { headers });
  }
  //modication demande
  update(id: number, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.baseUrl2}/demande/${id}`, data, {
      headers,
    });
  }

  //maka demande
  getdemande(id: number): Observable<Demande> {
    const headers = this.getHeaders();
    return this.http.get<Demande>(`${this.baseUrl2}/demande/${id}`, {
      headers,
    });
  }
   //filtre DETAILDEMANDE
   getFiltreDetailDemande(idDirection : string , montantMga : string): Observable<DetailDemande[]> {
    const headers = this.getHeaders();
    // search(idDirection : string | '' , statut: string | '', motif : string | '', datedebut :string | '', datefin :string | '', session : string | '' , idfournisseur : string | '' ): Observable<DetailDemande[]>{

      const queryParams = new URLSearchParams();
      queryParams.append('idDirection', idDirection ? encodeURIComponent(idDirection) : ''); // Handle empty strings and special characters
      queryParams.append('montantMga', montantMga ? encodeURIComponent(montantMga) : '');
    

      
      const url = `${this.baseUrl}/getValidation?${queryParams.toString()}`; // Build URL with encoded params

      return this.http.get<DetailDemande[]>(url, { headers });
    //  return this.http.get<DetailDemande[]>(this.baseUrl+`/search?idDirection=${idDirection}&statut=${statut}&motif=${motif}&dateDebut=${datedebut}&dateFin=${datefin}&session=${session}&idFournisseur=${idfournisseur}`,{headers});
    
    
    // return this.http.get<DetailDemande[]>(this.baseUrl + '/detailDemande/get', {
    //   headers,
    // });
    
  }
  //modication demande
  // updatexhr(id:number,dataa:  any ){
  //   var data = JSON.stringify(
  //   dataa
  //   );

  //   var xhr = new XMLHttpRequest();
  //   xhr.withCredentials = true;

  //   xhr.addEventListener("readystatechange", function() {
  //     if(this.readyState === 4) {
  //       console.log(this.responseText);
  //     }
  //   });

  //   xhr.open("PUT", "http://localhost:8080/prescripteur/demande/34");
  //   xhr.setRequestHeader("Content-Type", "application/json");
  //   xhr.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));

  //   xhr.send(data);
  // }
  // getUserInfo(token : string){
  //   var data = "grant_type=password&client_id=angular-client&client_secret=eIRXkLaEnLubyFr1mqwv6bu862oHIIn9";

  //             var xhr = new XMLHttpRequest();
  //             xhr.withCredentials = true;
  //             var direction = "";
  //             xhr.addEventListener("readystatechange", function() {
  //               if(this.readyState === 4 && this.status === 200) {
  //                 console.log(this.responseText);
  //                 const data = JSON.parse(xhr.responseText);

  //               }
  //             });

  //             xhr.open("GET", "http://localhost:/realms/oma/protocol/openid-connect/userinfo");
  //             xhr.setRequestHeader("Authorization", "bearer "+token);
  //             xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  //             xhr.send(data);
  // }
  //exportetr donnees excel
  // exportToExcel(data: any[], fileName: string): void {
  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   XLSX.writeFile(wb, fileName);
  // }
}
