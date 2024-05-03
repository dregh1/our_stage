import { Injectable } from '@angular/core';
import  { Fournisseur } from 'src/app/models/Fournisseur';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { DetailDemande } from 'src/app/models/DetailDemande';
import { Direction } from 'src/app/models/Direction';
import { SessionCd } from 'src/app/models/SessionCd';
import * as XLSX from 'xlsx';
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
  // maka periode
  getdirection(): Observable<Direction[]> {
    const headers = this.getHeaders();
    return this.http.get<Direction[]>(this.baseUrl+'/getDirection',{headers});
  }
  // maka session
  getsession(): Observable<SessionCd[]> {
    const headers = this.getHeaders();
    return this.http.get<SessionCd[]>(this.baseUrl+'/session/get',{headers});
  }
  
    search(idDirection : string | '' , statut: string | '', motif : string | '', datedebut :string | '', datefin :string | '', session : string | '' , idfournisseur : string | '' ): Observable<DetailDemande[]>{
      const headers = this.getHeaders();
      const queryParams = new URLSearchParams();
      queryParams.append('idDirection', idDirection ? encodeURIComponent(idDirection) : ''); // Handle empty strings and special characters
      queryParams.append('statut', statut ? encodeURIComponent(statut) : '');
      queryParams.append('motif', motif ? encodeURIComponent(motif) : '');
      queryParams.append('dateDebut', datedebut ? encodeURIComponent(datedebut) : '');
      queryParams.append('dateFin', datefin ? encodeURIComponent(datefin) : '');
      queryParams.append('session', session ? encodeURIComponent(session) : '');
      queryParams.append('idFournisseur', idfournisseur ? encodeURIComponent(idfournisseur) : '');

      
      const url = `${this.baseUrl}/detailDemande/search?${queryParams.toString()}`; // Build URL with encoded params

      return this.http.get<DetailDemande[]>(url, { headers });
    //  return this.http.get<DetailDemande[]>(this.baseUrl+`/search?idDirection=${idDirection}&statut=${statut}&motif=${motif}&dateDebut=${datedebut}&dateFin=${datefin}&session=${session}&idFournisseur=${idfournisseur}`,{headers});
    }
    //exportetr donnees excel 
    exportToExcel(data: any[], fileName: string): void {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, fileName);
    }
}
