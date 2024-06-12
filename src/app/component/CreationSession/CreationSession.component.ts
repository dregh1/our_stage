import { Component, OnInit } from '@angular/core';
import {
  HttpParams,
  HttpHeaders,
  HttpClient,
  HttpResponse,
} from '@angular/common/http';
import { CreationSession1Service } from './CreationSession.service';
import { DatePipe, NumberSymbol } from '@angular/common';
import { AuthenticationService } from '../Authentication/authentication.service';
import { Direction } from 'src/app/models/Direction';
import { SessionCd } from 'src/app/models/SessionCd';
@Component({
  selector: 'app-creation-session1',
  templateUrl: './CreationSession.component.html',
  styleUrls: ['./CreationSession.component.scss'],
})
export class CreationSession1Component implements OnInit {
  token: string | null;
  nomDirection: string | null = '';
  idDirection?: Number;
  //CREATION SESSION
  direction = new Direction();

  session = new SessionCd();
  datePipe:DatePipe;

  userName = '';
alert=false;
  showPassword = false;
  showmesg = false;errorMessage:string='';boutonClique=false;
  estChampVidegbp=true;estChampVideeur=true;estChampVideusd=true;estChampVidedatedebut=true;
  estChampVidedatecloture=true;
  constructor(
    private CreationSession1Service: CreationSession1Service,
    // private personnelService: PersonnelService,
    private http: HttpClient,
    private authServ: AuthenticationService
  ) {
    ///initialisaaiton date
    this.datePipe= new DatePipe('en-US');
    this.token = sessionStorage.getItem("token");
    // this.idDirection = authServ.getIdDirectionByName();

  //RECUPERATION IdDirection                
    if(this.token !== null )
    {
    
    

        this.authServ.getUserInformation().subscribe(response=>{
          
          /* recuperation de l'id direction */
          this.nomDirection = this.authServ.getDirection(response['direction']);

          if(this.nomDirection !== null)
            {
              this.authServ.getDirectionByName(this.nomDirection).subscribe(response =>{
                 this.direction = response;
               
                 
                 this.idDirection = response.id;  
                });
            }
        });

      
        
       
    
    }
  }

  ngOnInit(): void {

  }
getormatdate(){
  const date= new Date();
  return this.datePipe.transform(date,'yyyy-MM-dd');  
}
  // submit bouton ouvrir session
  openSession() {
    // this.session.idDirection =  this.idDirection;


     
    this.boutonClique = true;
    // this.estChampVidemontant= this.demande.montantHt.trim().length === 0;
   
    
    //this.session.dateDebut=this.getormatdate()?.toString() ?? '';
    // console.log('SSESESSESESE' + this.session.idDirection);
    console.log(this.session);
    console.log(this.session.dateDebut,'date debut');
    
    // creation session
    let missingField: keyof SessionCd | null = null; // Type for the missing field name
    if (!this.session.dateCloture) {
      missingField = 'datecloture' as keyof SessionCd;
    }
    if (!this.session.dateDebut) {
      missingField = 'datedebut' as keyof SessionCd; // Type assertion
    }
    if (!this.session.tauxEur) {
      missingField = 'eur' as keyof SessionCd;
    }
    if (!this.session.tauxUsd) {
      missingField = 'usd' as keyof SessionCd; // Type assertion
    }
   
    if (!this.session.tauxgbp) {
      missingField = 'gbp' as keyof SessionCd;
    }

    if (missingField) {
      this.errorMessage = `Veuillez remplir le champ ${missingField}`; // More specific error message
      console.log(this.errorMessage);
      
    } else {


      this.CreationSession1Service.post(this.session)
            .subscribe(
              (response) => {
                try{
              this.errorMessage="session enregistrée";
              this.alert=true;
              console.log("session enregistrée-----------------------------------------------");
              console.log(response);
            }catch(error){
              console.log('erreur',error);
              
            }
              //window.location.reload();
            } 
          
          );

    }


            

          
  }
  istauxeur(): boolean {
    if (typeof this.session.tauxEur === 'number') {
        // Convertir le nombre en chaîne et vérifier si elle est non vide après trim
        const trimmedMontantHt = String(this.session.tauxEur).trim();
        return trimmedMontantHt!== '';
    } else if (typeof this.session.tauxEur === 'string') {
        // Si c'est déjà une chaîne, juste vérifier si elle est non vide après trim
        return (this.session.tauxEur as string).trim()!== '';
    }
    // Si montantHt n'est ni un nombre ni une chaîne, retournez false par défaut
    return false;
}
istauxusd(): boolean {
  if (typeof this.session.tauxUsd === 'number') {
      // Convertir le nombre en chaîne et vérifier si elle est non vide après trim
      const trimmedMontantHt = String(this.session.tauxUsd).trim();
      return trimmedMontantHt!== '';
  } else if (typeof this.session.tauxUsd === 'string') {
      // Si c'est déjà une chaîne, juste vérifier si elle est non vide après trim
      return (this.session.tauxUsd as string).trim()!== '';
  }
  // Si montantHt n'est ni un nombre ni une chaîne, retournez false par défaut
  return false;
}
istauxgbp(): boolean {
  if (typeof this.session.tauxgbp === 'number') {
      // Convertir le nombre en chaîne et vérifier si elle est non vide après trim
      const trimmedMontantHt = String(this.session.tauxgbp).trim();
      return trimmedMontantHt!== '';
  } else if (typeof this.session.tauxgbp === 'string') {
      // Si c'est déjà une chaîne, juste vérifier si elle est non vide après trim
      return (this.session.tauxgbp as string).trim()!== '';
  }
  // Si montantHt n'est ni un nombre ni une chaîne, retournez false par défaut
  return false;
}
isdatecloture(): boolean {
  if (typeof this.session.dateCloture === 'number') {
      // Convertir le nombre en chaîne et vérifier si elle est non vide après trim
      const trimmedMontantHt = String(this.session.dateCloture).trim();
      return trimmedMontantHt!== '';
  } else if (typeof this.session.dateCloture === 'string') {
      // Si c'est déjà une chaîne, juste vérifier si elle est non vide après trim
      return (this.session.dateCloture as string).trim()!== '';
  }
  // Si montantHt n'est ni un nombre ni une chaîne, retournez false par défaut
  return false;
}
isdatedebut(): boolean {
  if (typeof this.session.dateDebut === 'number') {
      // Convertir le nombre en chaîne et vérifier si elle est non vide après trim
      const trimmedMontantHt = String(this.session.dateDebut).trim();
      return trimmedMontantHt!== '';
  } else if (typeof this.session.dateDebut === 'string') {
      // Si c'est déjà une chaîne, juste vérifier si elle est non vide après trim
      return (this.session.dateDebut as string).trim()!== '';
  }
  // Si montantHt n'est ni un nombre ni une chaîne, retournez false par défaut
  return false;
} 
}
