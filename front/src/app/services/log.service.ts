import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//// start------------ TY IZY RAHA HAMPIASA KEYCLOAK
export class LogService {
  // private baseUrl = 'http://localhost:8081/realms/oma/protocol/openid-connect/token';
  private baseUrl = 'http://localhost:8080/authent';
  constructor(private http: HttpClient) { }
  
  //mandefa login sy mdp any amin quarkus
  post(formData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'/check', formData);
  }
}