import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Direction } from '../models/Direction';
import { SessionCd } from '../models/SessionCd';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DetailDemande } from '../models/DetailDemande';
import { MyMail } from '../models/MyMail';
import { Titre } from '../models/TitreDepense';

@Injectable({
  providedIn: 'root'
})
export class UtilitaireService {
  
  private baseUrl = 'http://localhost:8080/teste';
  private baseUrl2='http://localhost:8080/prescripteur';

  constructor(private http: HttpClient) { }

      // recuperation Direction  
          getDirection(): Observable<Direction[]> {
            const headers = this.getHeaders();
            return this.http.get<Direction[]>(this.baseUrl+'/getDirection',{headers});
          }

          private getHeadersBytoken(tokenAdmin : string): HttpHeaders {
              
            
                if (tokenAdmin) {
                  return new HttpHeaders({ Authorization: `Bearer ${tokenAdmin}` });
                } else {
                  // Handle the case where no token is found (e.g., throw an error or redirect to login)
                  throw new Error('No authorization token found');
                }
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

         // get id or a groupe
         sendingMail(directionName : string ) {


         }

         getMailUser(idGroup : string , tokenAdmin : string)
         {
           const url  = `http://localhost:8083/admin/realms/oma/groups/${idGroup}/members`;
           const headers = new HttpHeaders({ Authorization: `Bearer ${tokenAdmin}` });
           return this.http.get<any[]>(url, { headers });
         }


         getIdOfGroup(nomGroupe : string , tokenAdmin : string)
         {
           const url  = 'http://localhost:8083/admin/realms/oma/groups?search='+nomGroupe;
           const headers = new HttpHeaders({ Authorization: `Bearer ${tokenAdmin}` });
           return this.http.get<any>(url, { headers });
         }

         mailSender(mails: MyMail[]): Observable<any> {
           const headers = this.getHeaders();
           return this.http.post<any>(this.baseUrl + '/sessionOuverte', mails, {
             headers,
           });
         }

         sendMail()
         {
         
           const mail =
           {
             username : '',
             email : '',
           }
           let mails : MyMail []=[];

           const url = 'http://localhost:8083/realms/oma/protocol/openid-connect/token';

           const params = new HttpParams()
           .set('grant_type', 'password')
           .set('client_id', 'angular-client')
           .set('client_secret', 'F6ONL3ox63NBv1h1J5wmmibHlDhLA1MI')
           .set('username', 'charlesandrea')
           .set('password', 'password');

       

           // return this.http.post<any>(url,{ params }).subscribe(response =>{ console.log(response); }) ;
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
                     
                     // console.log(tokenAdmin);
                     // console.log(response);

                     // recuperation de id Du groupe
                    //  this.getIdOfGroup("DSI",tokenAdmin)
                    //  .subscribe(
                    //              (groupObject)=> {
                                                 
                    //                            console.log(groupObject)
                                               
                    //                              if (groupObject[0].hasOwnProperty('id'))
                    //                              {
                    //                                const idGroup = groupObject[0].id;

                    //                                //RECUPERATION DES MAIL DES UTILISATEURS
                    //                     //            this.getMailUser(idGroup,tokenAdmin)
                    //                     //              .subscribe((userListe)=>
                    //                     //              {
                    //                     //                console.log(userListe);
                    //                     //                //RECUPERATION des email de tous utilisateurs
                    //                     //                // console.log("taille :"+userListe.length);
                                                       
                    //                     //                 //  for(let i =0;i<userListe.length; i++ )
                    //                     //                 //  {
                    //                     //                 //    const oneMail = new MyMail();
                                                           
                    //                     //                 //    oneMail.username = userListe[i].username;
                    //                     //                 //    oneMail.email = userListe[i].email;
                                                           
                    //                     //                 //    mails.push(oneMail);

                    //                     //                 //  }

                    //                     // //RECUPERATION MAIL PRESCRIPTEUR
                                                        
                    //                     //                  // console.log(mails);

                    //                     //              }
                    //                     //            )
                                        

                    //     }else
                    //     {
                    //       console.error("Aucune groupe trouvé");
                          
                    //     }
                    //                            },
                                 
                    //              (error)=> console.log(error)
                    //            );


                    this.getEmailPRS(tokenAdmin)
                                        .then(
                                          (emails: MyMail[]) => 
                                            {
                                              console.log("#####################");
                                              mails = emails;
                                              console.log(emails);
                                              console.log("#####################");
                                              

                    //ENVOIE MAIL PRESCRIPTEUR 
                    this.mailSender (mails).subscribe((response) => {},(error)=>{}) ;

                                               });


                   }else 
                   {
                     console.error("Impossible d'envoyer le mail");
                     
                   }
                 }) ;
           

         }

         // get mail PRS
         async getEmailPRS( tokenAdmin : string): Promise<MyMail[]> {
  
  
          
          const ursPRS = "http://localhost:8083/admin/realms/oma/roles/CDG/users";
        
          const headers = this.getHeadersBytoken(tokenAdmin);
          try {
            const httpResponse = await this.http.get<any>(ursPRS, { headers }).toPromise();
            
            
            if (!httpResponse  ) {
              // console.error('Aucune réponse valide reçue', httpResponse);
              throw new Error('Aucune réponse valide reçue pour la liste ACH');
            }
     
      
            const responseAch = httpResponse; // Assurez-vous que la réponse contient les données attendues

      
            const mails: MyMail[] = [];
            for (let i = 0; i < responseAch.length; i++) {
              if (responseAch[i].hasOwnProperty('email') && responseAch[i].hasOwnProperty('username')) {
                const oneMail = new MyMail(responseAch[i].username, responseAch[i].email);
                mails.push(oneMail);
              }
            }
      
        
      
      
            console.log('_-_-_-_-_-_-_-_-_-_-__-_-_-_-_-_-_-_-_-_-_');
            
            console.log(mails); // Pour le débogage
            return mails; // Retourne le tableau de MyMail
          } catch (error) {
            console.error(error);
            throw error; // Propage l'erreur si nécessaire
          }
        }

         // get titre par IDSESSION & IDDIRECTION
         getTitres(idDirection : string | '' , idSession: string | ''): Observable<Titre[]>{
          const headers = this.getHeaders();
          const queryParams = new URLSearchParams();
          queryParams.append('idDirection', idDirection ? encodeURIComponent(idDirection) : ''); // Handle empty strings and special characters
          queryParams.append('idSession', idSession ? encodeURIComponent(idSession) : '');
          
          
          const url = `${this.baseUrl}/titre/get?${queryParams.toString()}`; // Build URL with encoded params
      
          return this.http.get<Titre[]>(url, { headers });
        }

        // check AVISCDG
        checkAvisCdgByIdDemande(idDemande : string):Observable<boolean>{
          
          const headers = this.getHeaders();
          
          return this.http.get<boolean>(`${this.baseUrl}/checkAvisCdgByIdDemande/${idDemande}`, {
            headers,
          });
        
        }



        // check AVISACH
        checkAvisAchatByIdDemande(idDemande : string):Observable<boolean>{
                  
          const headers = this.getHeaders();
          
          return this.http.get<boolean>(`${this.baseUrl}/checkAvisAchatByIdDemande/${idDemande}`, {
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
           // maka ny brouillon
  getDetailDemandebyId(id: number): Observable<DetailDemande> {
    const headers = this.getHeaders();
    return this.http.get<DetailDemande>(`${this.baseUrl}/detailDemande/${id}`, {
      headers,
    });
  }


}
