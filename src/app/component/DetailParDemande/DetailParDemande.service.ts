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
@Injectable({
  providedIn: 'root',
})
export class TesteService {
  private url = 'http://localhost:8080';

  private baseUrl = 'http://localhost:8080/teste';
  private baseUrl4 = 'http://localhost:8080/achat';
  private baseUrl3 = 'http://localhost:8080/cdg';
  private baseUrl2 = 'http://localhost:8080/prescripteur';

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

  //maka titre
  getTitre(): Observable<Titre[]> {
    const headers = this.getHeaders();
    return this.http.get<Titre[]>(this.baseUrl + '/titre/get', { headers });
  }
  //get titre par session et direction
  GetTitreParSession(idDirection : string | '' ): Observable<Titre[]>{
    const headers = this.getHeaders();
    const queryParams = new URLSearchParams();

    // if(idDirection !== '')
    queryParams.append('idDirection', idDirection ? encodeURIComponent(idDirection) : ''); // Handle empty strings and special characters
    
    // if(idsession !== '')
    
    const url = `${this.baseUrl}/titre/get?${queryParams.toString()}`; // Build URL with encoded params

    return this.http.get<Titre[]>(url, { headers });
  //  return this.http.get<DetailDemande[]>(this.baseUrl+`/search?idDirection=${idDirection}&statut=${statut}&motif=${motif}&dateDebut=${datedebut}&dateFin=${datefin}&session=${session}&idFournisseur=${idfournisseur}`,{headers});
  }
  //maka demande
  getdemande(id: number): Observable<Demande> {
    const headers = this.getHeaders();
    return this.http.get<Demande>(`${this.baseUrl2}/demande/${id}`, {
      headers,
    });
  }
  //Ajout titre

  posttitre(formData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.baseUrl2 + '/titre/create', formData, {
      headers,
    });
  }
  // maka ny brouillon
  getDetailDemandebyId(id: number): Observable<DetailDemande> {
    const headers = this.getHeaders();
    return this.http.get<DetailDemande>(`${this.baseUrl}/detailDemande/${id}`, {
      headers,
    });
  }
  // maka ny brouillon
  getActiveId(id: number): Observable<DetailDemande> {
    const headers = this.getHeaders();
    return this.http.get<DetailDemande>(`${this.baseUrl2}/active_dmd/${id}`, {
      headers,
    });
  }
  //modication demande
  update(id: number, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.baseUrl2}/demande/${id}`, data, {
      headers,
    });
  }
  //suppression
  //recherche
  searchByName(name: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseUrl2}/brouillon/?name=${name}`, {
      headers,
    });
  }
  // maka periode
  getPeriode(): Observable<Periode[]> {
    const headers = this.getHeaders();
    return this.http.get<Periode[]>(this.baseUrl + '/periode/get', { headers });
  }
  // maka periode
  getFournisseur(): Observable<Fournisseur[]> {
    const headers = this.getHeaders();
    return this.http.get<Fournisseur[]>(this.baseUrl + '/fournisseur/get', {
      headers,
    });
  }
  // maka rubrique
  getRubrique(): Observable<Rubrique[]> {
    const headers = this.getHeaders();
    return this.http.get<Rubrique[]>(this.baseUrl2 + '/rubrique/get', {
      headers,
    });
  }

  //////////// CDG/////////////////
  // maka ny coms cdg
  getCdgById(id: number): Observable<AvisCdg> {
    const headers = this.getHeaders();
    return this.http.get<AvisCdg>(`${this.baseUrl3}/avisCdgByIdDemande/${id}`, {
      headers,
    });
  }

  // checkComsCdgByIdDemande(id: number): Observable<boolean> {
  //   const headers = this.getHeaders();
  //   return this.http.get<boolean>(`${this.baseUrl3}/checkAvisCdgByIdDemande/${id}`, {
  //     headers,
  //   });
  // }


  //avis cdg
  postCdg(formData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.baseUrl3}/avisCdg/create/`, formData, {
      headers,
    });
  }
  updateCdg(id: number, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.baseUrl3}/avisCdg/${id}`, data, {
      headers,
    });
  }

  ///////////////Achat/////////
  // maka ny coms achat
  getAchatById(id: number): Observable<AvisAchat> {
    const headers = this.getHeaders();
    return this.http.get<AvisAchat>(
      `${this.baseUrl4}/avisAchatByIdDemande/${id}`,
      { headers }
    );
  }
  //avis achat
  postAchat(formData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.baseUrl4}/avisAchat/create`, formData, {
      headers,
    });
  }
  //modication demande
  updateAchat(id: number, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.baseUrl4}/avisAchat/${id}`, data, {
      headers,
    });
  }
  ////check seession
  checkSession(id:undefined|number): Observable<boolean> {
    const headers = this.getHeaders();
    return this.http.get<boolean>(`${this.baseUrl2}/checkSession/${id}`, {
      headers,
    });
  }

  // maka titre by id
  gettitreById(id: number): Observable<Titre> {
    const headers = this.getHeaders();
    return this.http.get<Titre>(
      `${this.baseUrl2}/titre/${id}`,
      { headers }
    );
  }
  //modication titredepense
  updatetitredepense(id: number, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.baseUrl2}/titre/${id}`, data, {
      headers,
    });
  }

  
}
