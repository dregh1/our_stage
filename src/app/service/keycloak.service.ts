import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { take } from 'rxjs';
import { MyMail } from '../models/MyMail';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  constructor(private http: HttpClient) { }



  //token admin
  getTokenAdmin(): Promise<string | null> {
    const url = 'http://localhost:8082/realms/oma/protocol/openid-connect/token';
    const params = new HttpParams()
     .set('grant_type', 'password')
     .set('client_id', 'quarkus-client')
     .set('client_secret', 'diNdyU2iGksempOMKqs5gZlA2UkwngCJ')
     .set('username', 'charlesandrea')
     .set('password', 'password');

    return this.http.post<any>(url, params.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    }).toPromise()
    .then(response => {
      if (response && response.access_token!== undefined) {
        return response.access_token; // Maintenant, TypeScript sait que response est un objet avec une propriété access_token
      } else {
        throw new Error("Authentification admin failed");
      }
    });
  }

  //get id of a Groupe by name 
  // getMembreGroupe(nomGroupe : string) 
  // {
  //   let usersKeyCloak : User []= [];
  //   const url = 'http://localhost:8083/admin/realms/oma/groups?search='+nomGroupe;

  //   const idGroupe = '';
  //   const tokenAdmin = this.getTokenAdmin()
  //   .then((tokenAdmin : string |null )=>
  //   { 
  
  //     //recuperation information du groupe        
  //     this.http.get<any>(url, {
  //         headers: new HttpHeaders({ Authorization: `Bearer ${tokenAdmin}` })
  //       })
  //       .subscribe((response)=>{
          
  //         // console.log(response[0].id);
          
  //         if(response[0].hasOwnProperty('id'))
  //         {
            
  //             let  idGroupe = response[0].id;
              
  //             //recuperation membre dans la groupe
  //             this.http.get<any>('http://localhost:8083/admin/realms/oma/groups/'+idGroupe+'/members', {
  //               headers: new HttpHeaders({ Authorization: `Bearer ${tokenAdmin}` })
  //             })
  //             .toPromise()
  //             .then(reponse => {
  //               if (reponse && reponse!== undefined) {
  //                 for(let item of reponse)
  //                 {
  //                   let user = new User();
  //                   user.id = reponse.id;
  //                   user.firstName =reponse.firstName;
  //                   user.lastName =reponse.lastName;
                    
  //                   usersKeyCloak.push(user);
  //                 }

  //                 return usersKeyCloak;
                  
  //                  // Maintenant, TypeScript sait que response est un objet avec une propriété access_token
  //               } else {
  //                 throw new Error("Aucune groupe trouvé failed");
  //               }

  //             });
  //         } 
          
          
          
  //         //recuperation des membres du groupe
          


  //       });
  //   });

   

  // }


  async getMembreGroupe(nomGroupe: string): Promise<User[]> {
    let usersKeyCloak: User[] = [];
  
    const url = 'http://localhost:8082/admin/realms/oma/groups?search=' + nomGroupe;
  
    try {
      const tokenAdmin = await this.getTokenAdmin();
  
      // Récupération des informations du groupe
      this.http.get<any>(url, {
        headers: new HttpHeaders({ Authorization: `Bearer ${tokenAdmin}` })
      }).pipe(take(1)).subscribe(async (response) => {
        if (response.length > 0 && response[0].hasOwnProperty('id')) {
          const idGroupe = response[0].id;
  
          // Récupération des membres du groupe
          const membersResponse = await this.http.get<any>('http://localhost:8082/admin/realms/oma/groups/' + idGroupe + '/members', {
            headers: new HttpHeaders({ Authorization: `Bearer ${tokenAdmin}` })
          }).toPromise();
  
          if (membersResponse && membersResponse!== undefined) {
            for (let member of membersResponse) {
              let user = new User(member.id,member.firstName,member.lastName );
              if(member.hasOwnProperty("email"))
              user.email = member.email;
              // user.id = member.id;
              // user.firstName = member.firstName;
              // user.lastName = member.lastName;
  
              usersKeyCloak.push(user);
            }
              // console.log("-------------------");
              // console.log(usersKeyCloak);
              
            return usersKeyCloak;
          } else {
            throw new Error("Aucun membre trouvé dans le groupe");
          }
        } else {
          throw new Error("Groupe non trouvé");
        }
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  
    return usersKeyCloak;
  }
  

 async getMembreRole(nomRole : string) : Promise<User[]>
 {
    let usersKeyCloak :User []= [];
    try {
      const tokenAdmin = await this.getTokenAdmin();
      
      const membersResponse = await this.http.get<any>('http://localhost:8082/admin/realms/oma/roles/'+nomRole+'/users', {
            headers: new HttpHeaders({ Authorization: `Bearer ${tokenAdmin}` })
          }).toPromise()
            
            const response = membersResponse ;
          
            if (response && response!== undefined) {
              for (let member of membersResponse) {
                 let user = new User(member.id,member.firstName,member.lastName );
                  if(member.hasOwnProperty("email"))
                  user.email = member.email;

                usersKeyCloak.push(user);
              }
              console.log("-------------------");
              console.log(usersKeyCloak);
              return usersKeyCloak; // Maintenant, TypeScript sait que response est un objet avec une propriété access_token
            } else {
              throw new Error("Authentification admin failed");
            }
       
          
    } catch (error) {
      console.error(error);
      throw error;
    }

  }

  //  findMatchingUsers(users1: Promise<User[]>, users2: Promise<User[]>): Promise<User[]> {
  //   return Promise.all([users1, users2])
  //   .then(([users1Array, users2Array]) => {
  //     const matchingUsers: User[] = [];
  
  //     // Compare chaque utilisateur des deux tableaux
  //     users1Array.forEach(user1 => {
  //       users2Array.forEach(user2 => {
  //         console.log("------------------------------------------------");
          
  //         console.log(user1.id+ "===" +user2.id);
          
  //         if (user1.id === user2.id ) {
           
  //           matchingUsers.push(new User(user1.id, user1.firstName, user1.lastName));
  //         }
  //       });
  //     });
  
  //     return matchingUsers;
  //   });
  // }
  findMatchingUsers(users1: User[], users2: User[]): MyMail[] {
    const matchingUsers: MyMail[] = [];
  
    // Compare chaque utilisateur des deux tableaux
    users1.forEach(user1 => {
      users2.forEach(user2 => {
        console.log("------------------------------------------------");
  
        // console.log(user1.id + "===" + user2.id);
  
        if (user1.id === user2.id) {
          matchingUsers.push(new MyMail(user1.firstName, user1.email));
        }
      });
    });
  
    return matchingUsers;
  }

}
