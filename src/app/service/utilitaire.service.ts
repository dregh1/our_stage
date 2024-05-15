import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Direction } from '../models/Direction';
import { SessionCd } from '../models/SessionCd';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DetailDemande } from '../models/DetailDemande';

@Injectable({
  providedIn: 'root'
})
export class UtilitaireService {
  
  private baseUrl = 'http://localhost:8080/teste';

  constructor(private http: HttpClient) { }

      // recuperation Direction  
          getDirection(): Observable<Direction[]> {
            const headers = this.getHeaders();
            return this.http.get<Direction[]>(this.baseUrl+'/getDirection',{headers});
          }

          private getHeaders(): HttpHeaders {
              
            const token = sessionStorage.getItem('token');                  // Recuperation token
          
                if (token) {
                  return new HttpHeaders({ Authorization: `Bearer ${token}` });
                } else {
                  // Handle the case where no token is found (e.g., throw an error or redirect to login)
                  throw new Error('No authorization token found');
                }
          }


      // recuperation session
          getSession(): Observable<SessionCd[]> {
            const headers = this.getHeaders();
            return this.http.get<SessionCd[]>(this.baseUrl+'/session/get',{headers});
          }

          getSessionByDirection(idDirection : string): Observable<SessionCd> {
            const headers = this.getHeaders();
            const queryParams = new URLSearchParams();
            queryParams.append('dir', idDirection ? encodeURIComponent(idDirection) : '');
 
            const url = `${this.baseUrl}/session/active?${queryParams.toString()}`; // Build URL with encoded params
            return this.http.get<SessionCd>(url, { headers });

          }

          updateSession(id: number, formData: any): Observable<any> {
            const headers = this.getHeaders();
            
            console.log("DATA TO SET--------------------");
            console.log(formData);
            
            return this.http.put<any>(`${this.baseUrl}/session/${id}`, formData, {
              headers,
            });
          }

          
}
