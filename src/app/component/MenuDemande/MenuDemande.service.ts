import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DetailDemande } from 'src/app/models/DetailDemande';
import { HttpHeaders } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { Brouillon } from 'src/app/models/Brouillon';
import { IfStmt } from '@angular/compiler';
import { Demande } from 'src/app/models/Demande';
@Injectable({
  providedIn: 'root',
})
export class MenuDemandeService {
  private baseUrl = 'http://localhost:8080/prescripteur';
  private baseUrl2 = 'http://localhost:8080/teste';
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
  
  // // maka ny brouillon
  // getBrouillon(): Observable<DetailDemande[]> {
  //   const headers = this.getHeaders();
  //   return this.http.get<DetailDemande[]>(this.baseUrl + '/detailDemande/get', {
  //     headers,
  //   });
  // }
  //exportetr donnees excel
  // exportToExcel(data: any[], fileName: string): void {
  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   XLSX.writeFile(wb, fileName);
  // }
  //exportetr donnees excel 
  exportToExcel(data: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, fileName);
  }
  searchbrouillon(idDirection : string | '' , idsession :string | ''): Observable<Brouillon[]>{
    const headers = this.getHeaders();
    const queryParams = new URLSearchParams();
    queryParams.append('idDirection', idDirection ? encodeURIComponent(idDirection) : ''); // Handle empty strings and special characters
    queryParams.append('idSession', idsession ? encodeURIComponent(idsession) : '');
    
    const url = `${this.baseUrl}/brouillon/s?${queryParams.toString()}`; // Build URL with encoded params

    return this.http.get<Brouillon[]>(url, { headers });
  //  return this.http.get<DetailDemande[]>(this.baseUrl+`/search?idDirection=${idDirection}&statut=${statut}&motif=${motif}&dateDebut=${datedebut}&dateFin=${datefin}&session=${session}&idFournisseur=${idfournisseur}`,{headers});
  }
  search(idDirection : string | '' , idsession :string | ''): Observable<DetailDemande[]>{
    const headers = this.getHeaders();
    const queryParams = new URLSearchParams();

    // if(idDirection !== '')
    queryParams.append('idDirection', idDirection ? encodeURIComponent(idDirection) : ''); // Handle empty strings and special characters
    
    // if(idsession !== '')
    queryParams.append('idSession', idsession ? encodeURIComponent(idsession) : '');
    
    const url = `${this.baseUrl2}/active/s?${queryParams.toString()}`; // Build URL with encoded params

    return this.http.get<DetailDemande[]>(url, { headers });
  //  return this.http.get<DetailDemande[]>(this.baseUrl+`/search?idDirection=${idDirection}&statut=${statut}&motif=${motif}&dateDebut=${datedebut}&dateFin=${datefin}&session=${session}&idFournisseur=${idfournisseur}`,{headers});
  }
  getAttenteSession(idDirection : string | ''): Observable<DetailDemande[]>{
    const headers = this.getHeaders();
    const queryParams = new URLSearchParams();

    // if(idDirection !== '')
    queryParams.append('idDirection', idDirection ? encodeURIComponent(idDirection) : ''); // Handle empty strings and special characters
    
    
    const url = `${this.baseUrl}/attenteSession/s?${queryParams.toString()}`; // Build URL with encoded params

    return this.http.get<DetailDemande[]>(url, { headers });
  //  return this.http.get<DetailDemande[]>(this.baseUrl+`/search?idDirection=${idDirection}&statut=${statut}&motif=${motif}&dateDebut=${datedebut}&dateFin=${datefin}&session=${session}&idFournisseur=${idfournisseur}`,{headers});
  }
   //maka demande
   getAttteneSessionById(id: number): Observable<Demande> {
    const headers = this.getHeaders();
    return this.http.get<Demande>(`${this.baseUrl}/attenteSession/${id}`, {
      headers,
    });
  }
  
}
