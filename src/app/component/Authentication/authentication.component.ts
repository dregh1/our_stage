import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
// Assurez-vous d'avoir importé boosted correctement

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  public errorStatus = false;
  //errorMessage ='Identifiant ou mot de passe incorrect' ;
  errorMessage= '';
  spinnershow:boolean = false;
  showPassword: boolean = false;
  showmesg = false;
alert=false;erreur=false;
  logindata = {
    username: '',
    password: '',
  };

  username: any;
  password: any;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  // NG ON INIT
  ngOnInit(): void {}

  //ENVOYE LOGIN & MDP > KEYCLOAK
  sendToKc() {
    this.spinnershow=true;
    const body = new HttpParams()
      .set('username', this.logindata.username)
      .set('password', this.logindata.password)
      .set('grant_type', 'password')
      .set('client_id', 'quarkus-client')
      .set('client_secret', 'diNdyU2iGksempOMKqs5gZlA2UkwngCJ');

    return (
      this.http
        .post(
          'http://localhost:8082/realms/oma/protocol/openid-connect/token',
          body.toString(),
          {
            headers: new HttpHeaders().set(
              'Content-Type',
              'application/x-www-form-urlencoded'
            ),
          }
        )
        
        .subscribe((response: any) => {
          // Si la requête est réussie, le token est accessible ici
          if (response.hasOwnProperty('access_token') ) {
            const token = response.access_token;

            // Stockez le token dans le stockage du navigateur ou utilisez-le directement
            //console.log('\n\n\n\n\n\n Jeton reçu: \n\n\n\n\n\n ', token);

            // Stocker le jeton dans la session storage du navigateur
            sessionStorage.removeItem('token');
            sessionStorage.setItem('token', token);

           
            this.router.navigate(['/main/MenuDemande']);

            this.errorMessage = 'Utilisateur connecté';
            this.alert=true;
          } else {
            // Une erreur s'est produite
            console.error("Erreur lors de l'obtention du jeton:", response);
            this.logError();
            
          }
        },
      (error) => {
          this.errorMessage='Identifiant incorrect';
          this.erreur=true;
      }
      )
    );
    
  }

  // getIdOfDirection ( )
  // {
  //   const nomDirection  : string = "DTI";

  //   this.authenticationService.getIdDirectionByName(nomDirection)
  //           .subscribe(response => {
  //                           console.log( response);
  //                         }
  //                     );
  //   console.log("GGGGGGGGGGGGGG");

  // }

  logError(): void {
    this.errorStatus = true;
    this.errorMessage = 'Identifiants incorrects';
  }
  // VERIFIER LOGIN  //

  // onSubmit(): void {
  //   this.personnelService.post(this.personnel).subscribe(response => {
  //     console.log(response);
  //     this.showmesg = true;

  //     setTimeout(() => {
  //       this.showmesg = false;
  //     }, 2000);
  //     window.location.reload();
  //   });
  // }
 



  
}
