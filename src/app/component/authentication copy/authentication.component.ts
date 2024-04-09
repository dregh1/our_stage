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
import { AuthenticationService } from './authentication.service';
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
  

  constructor(private http: HttpClient,private authenticationService: AuthenticationService,private logService: LogService, private router: Router ,private personnelService: PersonnelService, private renderer: Renderer2, private el: ElementRef) {}
 

// NG ON INIT
          ngOnInit(): void {

          }

          

          // getInfo(token :  string)
          // {

          //   var headers = {
          //     'Authorization': 'bearer '+token,
          //     'Content-Type': 'application/x-www-form-urlencoded'
          //   };
          //   var request = this.http.('GET', Uri.parse('http://localhost:8081/realms/oma/protocol/openid-connect/userinfo'));
          //   request.bodyFields = {
          //     'grant_type': 'password',
          //     'client_id': 'angular-client',
          //     'client_secret': 'eIRXkLaEnLubyFr1mqwv6bu862oHIIn9'
          //   };
          //   request.headers.addAll(headers);
            
          //   http.StreamedResponse response = await request.send();
            
          //   if (response.statusCode == 200) {
          //     print(await response.stream.bytesToString());
          //   }
          //   else {
          //     print(response.reasonPhrase);
          //   }
          // }


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
            // // TY RAHA ERREUR TOKEN TSOTRA ///////////////////////
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
                sessionStorage.removeItem("token");
                sessionStorage.setItem('token', token);

                // recherche ny role
                //this.getUserInfo(token);
                // console.log("TTTTYYY");
                
                // console.log(this.getUserInfo(token));
                // redirection
                // this.getUserInfo(token)
                this.router.navigate(['/main/menu']);


                
              } else {
                // Une erreur s'est produite
                console.error('Erreur lors de l\'obtention du jeton:', response);
                this.logError();

              }
            });
          }

    getIdOfDirection ( ) 
    {
      const nomDirection  : string = "DTI";
      
      this.authenticationService.getIdDirectionByName(nomDirection)
              .subscribe(response => {
                              console.log( response);
                            }
                        ); 
      console.log("GGGGGGGGGGGGGG");

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

        verifierLogin(): void {
              
          // Rediriger l'utilisateur vers l'URL d'authentification de Keycloak
          // window.location.href = 'http://localhost:8081/realms/oma/protocol/openid-connect/token';
          
          //  vers keycloak  an' i Toky
          //  window.location.href = 'http://localhost:8081/auth/realms/quarkus/protocol/openid-connect/auth?response_type=code&client_id=quarkus-app&redirect_uri=http://localhost:8080/redirect';
              
          // ETAPE VERS QUARKUS
          this.logService.post(this.logindata)
            .subscribe((response: any)  => {
              
              // Traitez la réponse du backend si nécessaire
              
              // condition si l'utisateur est autorisé 
              if (response.message === 'Authentification réussie') {
                // Rediriger l'utilisateur vers la page d'accueil
                this.router.navigate(['/home']);
            }else{
              // Afficher un message d'erreur à l'utilisateur
              console.log("DISO A");
              this.errorStatus = true;
              this.errorMessage = 'Identifiants incorrects';
          }

          // VERS KEYCLOAK


              console.log(response);
              
              this.showmesg=true;
              
              
            });
        }
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

          

         
          ///////////////////////////Animation slide///////////////////////////////////////
          // ngAfterViewInit() {
          //   const signup = this.el.nativeElement.querySelector('.signup');
          //   const login = this.el.nativeElement.querySelector('.login');
          //   //const slider = this.el.nativeElement.querySelector('.slider');
          //   const formSection = this.el.nativeElement.querySelector('.form-section');

          //   signup.addEventListener('click', () => {
          //   //  this.renderer.addClass(slider, 'moveslider');
          //     this.renderer.addClass(formSection, 'form-section-move');
          //   });

          //   login.addEventListener('click', () => {
          //     //this.renderer.removeClass(slider, 'moveslider');
          //     this.renderer.removeClass(formSection, 'form-section-move');
          //   });
          //  }

}




  