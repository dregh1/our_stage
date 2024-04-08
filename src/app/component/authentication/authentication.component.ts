import { Component, OnInit, Renderer2, ElementRef, AfterViewInit ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Personnel } from 'src/app/models/Personnel';
import { PersonnelService } from 'src/app/services/personnel.service';
import { LogService } from 'src/app/services/log.service';
//import { KeycloakService } from 'keycloak-angular';
//import Keycloak from 'keycloak-js';
import * as qs from 'qs';
//import jwtDecode from 'jwt-decode';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  public errorStatus = false;
  errorMessage ='Identifiant ou mot de passe incorrect' ;
  
  personnels: Personnel[] = []; 
  showPassword: boolean = false;
  showmesg = false; 

  personnel = {
    id: '' ,
    nom: '',
    prenom: '',
    age: ''
  };
  logindata = {
   
    username: '',
    password: '',
    
  }
  
  username: any;
  password: any;

  // keycloak rehetra
  // username: string;
  // password: string;
  // keycloak: Keycloak;
  

  constructor(private http: HttpClient,private logService: LogService, private router: Router ,private personnelService: PersonnelService, private renderer: Renderer2, private el: ElementRef) {}
  //,private readonly keycloakService: KeycloakService

// NG ON INIT
          ngOnInit(): void {



            this.personnelService.get().subscribe(data => {
              this.personnels = data;
            });
          }

//ENVOYE LOGIN & MDP > KEYCLOAK
          sendToKc(){
            const body = new HttpParams()
            .set('username', this.logindata.username)
            .set('password', this.logindata.password)
            .set('grant_type', 'password')
            .set('client_id', 'angular-client')
            .set('client_secret', 'diNdyU2iGksempOMKqs5gZlA2UkwngCJ');
        
            return this.http.post('http://localhost:8082/realms/oma/protocol/openid-connect/token', body.toString(), {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
            })
            // // TY RAHA ERREUR TOKEN TSOTRA
            // // .subscribe(
            // //   response  => {
            // //     // Gérer la réponse du jeton avec succès
            // //     console.log('Jeton reçu:', response);
            // //     console.log('\n\n\n\n\n\n');
                
            // //   },
            // //   error => {
            // //     // Gérer les erreurs pendant la requête
            // //     console.error('Erreur lors de l\'obtention du jeton:', error);
            // //     this.logError();
            // //   }
            // );
            .subscribe((response: any) => {
              // Si la requête est réussie, le token est accessible ici
              if (response.hasOwnProperty('access_token')) {
                const token = response.access_token;
            
                // Stockez le token dans le stockage du navigateur ou utilisez-le directement
                console.log('\n\n\n\n\n\n Jeton reçu: \n\n\n\n\n\n ', token);

                // Stocker le jeton dans la session storage du navigateur
                sessionStorage.setItem('token', token);

                // recherche ny role
                this.getUserInfo(token);
                //redirection
               // window.location.href = '/home';

                
              } else {
                // Une erreur s'est produite
                console.error('Erreur lors de l\'obtention du jeton:', response);
                this.logError();

              }
            });
          }

  
    getUserInfo(token : string){
      var data = "";

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
          if(this.readyState === 4  && this.status == 200) {
            console.log('ATO: ');
            console.log(this.response);
            const data = JSON.parse(xhr.responseText);
            if(data.hasOwnProperty('groups'))
            {
              const tableRole = data.groups;

              console.log('GROUPE: '+tableRole);

              console.log(data.groups);
              //return this.response.groups;

              for(let i =0 ; i <tableRole.length ; i++)
              {
                if(tableRole[i]==='CDG')
                {
                  console.log('C EST UN CDG!!!!!!!!!!!!!!!!!!!!!!');
                  // window.location.href = '/cdg';
                  break;
                }else
                if(tableRole[i]==='PRS')
                {
                  console.log('C EST  PRESCRIPTEUR!!!!!!!!!!!!!!!!!!!!!!');
                  // window.location.href = '/prescripteur';
                  break;
                }else
                if(tableRole[i]==='ACH')
                {
                  console.log('C EST UN ACHAT!!!!!!!!!!!!!!!!!!!!!!');
                  // window.location.href = '/achat';
                  break;

                }else
                {
                  // window.location.href = '/user';
                }

              }
              //sessionStorage.setItem("role",data);

            }else console.log('TSIS ROLE');
          }
        });

        xhr.open("GET", "http://localhost:8082/realms/oma/protocol/openid-connect/userinfo");
        xhr.setRequestHeader("Authorization", "Bearer "+token);

        xhr.send(data);
    }

    isCdg(tableRole : string[])
    {
      
    }

      getRole(donne: string){
//        donne =  {"sub":"29dc3d39-b477-4c3a-a403-34fd9f7dbf80","upn":"charlesandrea","email_verified":false,"name":"charles andrea","groups":["CDG"],"preferred_username":"charlesandrea","given_name":"charles","family_name":"andrea","email":"charles_andrea@gmail.com"};
      }


     


       

          logError()  : void
          {
              this.errorStatus = true;
              this.errorMessage = 'Identifiants incorrects';
          }
        // VERIFIER LOGIN  //

        
          onSubmit(): void {
            this.personnelService.post(this.personnel).subscribe(response => {
              console.log(response);
              this.showmesg = true;

              setTimeout(() => {
                this.showmesg = false;
              }, 2000);
              window.location.reload();
            });
          }

          deletePersonnel(id: number): void {
            this.personnelService.delete(id).subscribe(response => {
              console.log(response);
              window.location.reload();
            });
          }

          updateRecord(id: any, newData: any): void {
            this.personnelService.update(id, newData).subscribe(response => {
              console.log(response);
              window.location.reload();
            });
          }
          

}




  