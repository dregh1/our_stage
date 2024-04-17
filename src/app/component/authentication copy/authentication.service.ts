import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Direction } from 'src/app/models/Direction';
import { Personnel } from 'src/app/models/Personnel';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:8080/teste';

  constructor(private http: HttpClient) { }
  
  // get(): Observable<Personnel[]> {
  //   return this.http.get<Personnel[]>(this.baseUrl+'/all');
  // }
 
  

  //POSTMAN
  getUserInfo(token : string){
    var data = "grant_type=password&client_id=angular-client&client_secret=eIRXkLaEnLubyFr1mqwv6bu862oHIIn9";

              var xhr = new XMLHttpRequest();
              xhr.withCredentials = true;
              var direction = "";
              xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4 && this.status === 200) {
                  console.log(this.responseText);
                  const data = JSON.parse(xhr.responseText);


                        //MITADY ROLE
                                if(data.hasOwnProperty('groups'))
                                {
                                        const tableRole = data.groups;

                                        console.log('GROUPE: '+tableRole);

                                        console.log(data.groups);
                                        // return this.response.groups;

                                        for(let i =0 ; i <tableRole.length ; i++)
                                        {
                                          if(tableRole[i]==='CDG')
                                          {
                                            console.log('C EST UN CDG!!!!!!!!!!!!!!!!!!!!!!');
                                            sessionStorage.removeItem("role");
                                            sessionStorage.setItem("role",tableRole[i]);

                                            // window.location.href = '/cdg';
                                            break;
                                          }else
                                          if(tableRole[i]==='PRS')
                                          {
                                            console.log('C EST UN PRESCRIPTEUR!!!!!!!!!!!!!!!!!!!!!!');
                                            sessionStorage.removeItem("role");
                                            sessionStorage.setItem("role",tableRole[i]);

                                            // window.location.href = '/main/menu';
                                            break;
                                          }else
                                          if(tableRole[i]==='ACH')
                                          {
                                            console.log('C EST UN ACHAT!!!!!!!!!!!!!!!!!!!!!!');
                                            sessionStorage.removeItem("role");
                                            sessionStorage.setItem("role",tableRole[i]);
                                            // window.location.href = '/achat';
                                            break;

                                          }else
                                          {
                                            // window.location.href = '/user';
                                          }

                                        }
                                        //sessionStorage.setItem("role",data);

                                }else console.log('TSIS ROLE');
                        //MITADY DIRECTION apartir ny token
              //               console.log('MITADY DIRECTION');
                                if(data.hasOwnProperty('direction'))
                                  {
                                      // TABLEAU DE GROUPE
                                          const tableGROUPE = data.direction;
                                          console.log('GROUPE: '+tableGROUPE);

                                      //MAKA ID DIRECTION QUARKUS
                                          direction = tableGROUPE[0];
                                          sessionStorage.setItem("direction",direction);
                                          
                                          console.log("SESSION DIRECTION:"+ sessionStorage.getItem("direction"));
                                          
                                          console.log("ilay direction: "+direction);
                                        
                                          
                                          // this.authenticationService.getIdDirectionByName("ODC");

                                  }else console.log("tsy misy DIRECTION");
                        //MITADY NOM
                                if(data.hasOwnProperty('given_name'))
                                {
                                  const tableNOM = data.given_name;
                                  console.log('NOM: '+tableNOM);

                              //Metraka nom anaty session
                                  
                                  sessionStorage.setItem("nom",tableNOM); 
                                }
                }
              });

              xhr.open("GET", "http://localhost:8082/realms/oma/protocol/openid-connect/userinfo");
              xhr.setRequestHeader("Authorization", "bearer "+token);
              xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

              xhr.send(data);
  }
  // getIdDirectionByName(formData: any): Observable<number> {
  //   return this.http.get<any>(this.baseUrl+'/getIdDir', formData);
  // }

  
  // get(formData: any): Observable<Personnel[]> {
  //   return this.http.get<Personnel[]>(this.baseUrl+'/all', formData);
  // }

  post(formData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'/c', formData);
  }

  getDirectionByName(texte: string) :  Observable<Direction> {
    return this.http.get<any>(this.baseUrl+'/getIdDir?nom='+texte);
    } 


  //  getIdDirectionByName(   ){
  //   const token = sessionStorage.getItem("token");
  //   var direction = new Direction();
  //   var nomDirection : string | null ;
  //   var idDirection ;
  //   if(token !== null )
  //   {
    
  //   //RECUPERATION IdDirection
    
  //     /*  ajout nom direction dans la sessionStorage */
  //       this.getUserInfo(token);

  //     /* recuperation de l'id direction */
  //       nomDirection = sessionStorage.getItem('direction');
        
  //       if(nomDirection !== null)
  //       {
  //         console.log("ATOYYYYYYYYYYYYYYYYY");
          
  //         return this.getDirectionByName(nomDirection).toPromise()
  //         // .then(response =>{ 
  //         //     direction = response ; 
  //         //     console.log("rrrrrrrrrrrrrrrrr");
  //         //     console.log(response.id); 
  //         //     idDirection = response.id;
  //         //   });
  //         // .subscribe(response =>{ 
  //         //   direction = response ; 
  //         //   console.log("rrrrrrrrrrrrrrrrr");
  //         //   console.log(response.id); 
  //         //   idDirection = response.id;
  //         // });

  //         console.log("sssssssssssss")  ;
  //         console.log("tttttttttttt " +idDirection);
          
  //         return idDirection;                
  //       }
    
  //   }
  //   return undefined;
  // }
}
