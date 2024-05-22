import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyMail } from 'src/app/models/MyMail';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  constructor(private http: HttpClient) { }

  private getHeadersAdmin(): HttpHeaders {
              
    const token = sessionStorage.getItem('tokenAdmin');                  // Recuperation token
  
        if (token) {
          return new HttpHeaders({ Authorization: `Bearer ${token}` });
        } else {
          // Handle the case where no token is found (e.g., throw an error or redirect to login)
          throw new Error('No authorization token found');
        }
  }
  getTokenAdmin()
  {

    const url = 'http://localhost:8082/realms/oma/protocol/openid-connect/token';

    const params = new HttpParams()
    .set('grant_type', 'password')
    .set('client_id', 'quarkus-client')
    .set('client_secret', 'diNdyU2iGksempOMKqs5gZlA2UkwngCJ')
    .set('username', 'ash')
    .set('password', 'ash');



    // GET TOKEN ADMIN
    return this.http
    .post( url, params.toString(), 
        {  
          headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded'),
        }
      ).subscribe((response: any) =>
          {  


            //recuperation du token de l'admin keycloak
            if (response.hasOwnProperty('access_token') ) {
              const tokenAdmin = response.access_token;
              sessionStorage.setItem('tokenAdmin',tokenAdmin);
              
              
            } else 
            {
              console.error("Authentification admin failed");
              
            }
          }) ;
    

  }

  //GET ALL USERS
  getAllUser()
  {
    const url = "http://localhost:8082/admin/realms/oma/users";
  
    const headers = this.getHeadersAdmin();
    return this.http.get<any[]>(url,{headers});
    
  }
}
