import { HttpClient ,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Direction } from 'src/app/models/Direction';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:8080/teste';

  constructor(private http: HttpClient) {}

  // get(): Observable<Personnel[]> {
  //   return this.http.get<Personnel[]>(this.baseUrl+'/all');
  // }
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

  //POSTMAN
  // getUserInfo(token: string) {
  //   var data =
  //     'grant_type=password&client_id=quarkus-client&client_secret=eIRXkLaEnLubyFr1mqwv6bu862oHIIn9';

  //   var xhr = new XMLHttpRequest();
  //   xhr.withCredentials = true;
  //   var direction = '';
  //   xhr.addEventListener('readystatechange', function () {
  //     if (this.readyState === 4 && this.status === 200) {
  //       console.log(this.responseText);
  //       const data = JSON.parse(xhr.responseText);

  //       //MITADY ROLE
  //       if (data.hasOwnProperty('groups')) {
  //         const tableRole = data.groups;

  //         console.log('GROUPE: ' + tableRole);

  //         console.log(data.groups);
  //         // return this.response.groups;

  //         for (let i = 0; i < tableRole.length; i++) {
  //           if (tableRole[i] === 'CDG') {
  //             console.log('C EST UN CDG!!!!!!!!!!!!!!!!!!!!!!');
  //             sessionStorage.removeItem('role');
  //             sessionStorage.setItem('role', tableRole[i]);

  //             // window.location.href = '/cdg';
  //             break;
  //           } else if (tableRole[i] === 'PRS') {
  //             console.log('C EST UN PRESCRIPTEUR!!!!!!!!!!!!!!!!!!!!!!');
  //             sessionStorage.removeItem('role');
  //             sessionStorage.setItem('role', tableRole[i]);

  //             // window.location.href = '/main/menu';
  //             break;
  //           } else if (tableRole[i] === 'ACH') {
  //             console.log('C EST UN ACHAT!!!!!!!!!!!!!!!!!!!!!!');
  //             sessionStorage.removeItem('role');
  //             sessionStorage.setItem('role', tableRole[i]);
  //             // window.location.href = '/achat';
  //             break;
  //           } else {
  //             // window.location.href = '/user';
  //           }
  //         }
  //         //sessionStorage.setItem("role",data);
  //       } else console.log('TSIS ROLE');
  //       //MITADY DIRECTION apartir ny token
  //       //               console.log('MITADY DIRECTION');
  //       if (data.hasOwnProperty('direction')) {
  //         // TABLEAU DE GROUPE
  //         const tableGROUPE = data.direction;
  //         console.log('GROUPE: ' + tableGROUPE);

  //         //MAKA ID DIRECTION QUARKUS
  //         direction = tableGROUPE[0];
  //         sessionStorage.setItem('direction', direction);

  //         console.log(
  //           'SESSION DIRECTION:' + sessionStorage.getItem('direction')
  //         );

  //         console.log('ilay direction: ' + direction);

  //         // this.authenticationService.getIdDirectionByName("ODC");
  //       } else console.log('tsy misy DIRECTION');
  //       //MITADY NOM
  //       if (data.hasOwnProperty('given_name')) {
  //         const tableNOM = data.given_name;
  //         console.log('NOM: ' + tableNOM);

  //         //Metraka nom anaty session

  //         sessionStorage.setItem('nom', tableNOM);
  //       }
  //     }
  //   });

  //   xhr.open(
  //     'GET',
  //     'http://localhost:8082/realms/oma/protocol/openid-connect/userinfo'
  //   );
  //   xhr.setRequestHeader('Authorization', 'bearer ' + token);
  //   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  //   xhr.send(data);
  // }
  // getIdDirectionByName(formData: any): Observable<number> {
  //   return this.http.get<any>(this.baseUrl+'/getIdDir', formData);
  // }

  // get(formData: any): Observable<Personnel[]> {
  //   return this.http.get<Personnel[]>(this.baseUrl+'/all', formData);
  // }

  post(formData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/c', formData);
  }
  //maka iddirection anle user
  getDirectionByName(texte: string): Observable<Direction> {
    const headers = this.getHeaders();
    return this.http.get<any>(this.baseUrl + '/getIdDir?nom=' + texte, {
      headers,
    });
  }



  getUserInformation(){

    //definition des PARAMS 

    const params = new HttpParams()
    .set('grant_type', 'password')
    .set('client_id', 'quarkus-client')
    .set('client_secret', 'eIRXkLaEnLubyFr1mqwv6bu862oHIIn9');


    const headers = this.getHeaders();
    // return this.http.get<any>("http://localhost:8081/realms/oma/protocol/openid-connect/userinfo",body.toString())
    return this.http.get<any>("http://localhost:8082/realms/oma/protocol/openid-connect/userinfo",{headers,params})
  
  }

  getRole (tableRole : []){
    if(tableRole !== null )
      for(let i =0 ; i <tableRole.length ; i++)
      {
        if(tableRole[i]==='CDG')
        {
          console.log('C EST UN CDG!!!');
          // sessionStorage.removeItem("role");
          // sessionStorage.setItem("role",tableRole[i]);
          return tableRole[i] ;

        }else
        if(tableRole[i]==='PRS')
        {
          console.log('C EST UN PRESCRIPTEUR!!!');
          // sessionStorage.removeItem("role");
          // sessionStorage.setItem("role",tableRole[i]);
          return tableRole[i] ;

        }else
        if(tableRole[i]==='ACH')
        {
          console.log('C EST UN ACHAT!!!');
          // sessionStorage.removeItem("role");
          // sessionStorage.setItem("role",tableRole[i]);
          return tableRole[i] ;

        }else
        {
          console.error("AUCUNE ROLE !");
          return null;
        }

      }
      return null;
  }

  getDirection(tableGROUPE : string[])
  {
          if(tableGROUPE !== null)
          {
            return tableGROUPE[0];
            // for(let i =0 ; i <tableGROUPE.length ; i++)
            // {
            //   const direction = tableGROUPE[i] ;
            //   return direction;

            // }
              // TABLEAU DE GROUPE
          }else 
          {
            console.error("tsy misy DIRECTION");
            return null;
          }
  }
  // async getUserInfo(token : string) {
  //   const data = "grant_type=password&client_id=quarkus-client&client_secret=Ulb4eedexOT9Kgw9TzBaqi458JJM3peh";
  
  //   try {
  //     //Faire une requete USERINFO chez keycloak
  //     const response = await fetch("http://localhost:8081/realms/oma/protocol/openid-connect/userinfo", {
  //       method: "GET",
  //       headers: {
  //         "Authorization": "bearer " + token,
  //         "Content-Type": "application/x-www-form-urlencoded"
  //       },
  //       credentials: "include" // Equivalent à xhr.withCredentials = true
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error status: ${response.status}`);
  //     }
  
  //     const userInfo = await response.json();
  //     // console.log(userInfo);
  
  //     // MITADY ROLE
  //     if (userInfo.hasOwnProperty('groups')) {
  //       const tableRole = userInfo.groups;
  //       console.log('GROUPE: ' + tableRole);
  //       console.log(userInfo.groups);
  
  //       for (let i = 0; i < tableRole.length; i++) {
  //         if (tableRole[i] === 'CDG') {
  //           console.log('C EST UN CDG!!!!!!!!!!!!!!!!!!!!!!');
  //           sessionStorage.removeItem("role");
  //           sessionStorage.setItem("role", tableRole[i]);
  //           break;
  //         } else if (tableRole[i] === 'PRS') {
  //           console.log('C EST UN PRESCRIPTEUR!!!!!!!!!!!!!!!!!!!!!!');
  //           sessionStorage.removeItem("role");
  //           sessionStorage.setItem("role", tableRole[i]);
  //           break;
  //         } else if (tableRole[i] === 'ACH') {
  //           console.log('C EST UN ACHAT!!!!!!!!!!!!!!!!!!!!!!');
  //           sessionStorage.removeItem("role");
  //           sessionStorage.setItem("role", tableRole[i]);
  //           break;
  //         } else {
  //           // window.location.href = '/user';
  //         }
  //       }
  //     } else {
  //       console.log('TSIS ROLE');
  //     }
  
  //     // MITADY DIRECTION apartir ny token
  //     if (userInfo.hasOwnProperty('direction')) {
  //       const tableGROUPE = userInfo.direction;
  //       console.log('GROUPE: ' + tableGROUPE);
  //       const direction = tableGROUPE[0];
  //       sessionStorage.setItem("direction", direction);
  //       console.log("SESSION DIRECTION:" + sessionStorage.getItem("direction"));
  //       console.log("ilay direction: " + direction);
  //     } else {
  //       console.log("tsy misy DIRECTION");
  //     }
  
  //     // MITADY NOM
  //     if (userInfo.hasOwnProperty('given_name')) {
  //       const tableNOM = userInfo.given_name;
  //       console.log('NOM: ' + tableNOM);
  //       sessionStorage.setItem("nom", tableNOM);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }

  
}
