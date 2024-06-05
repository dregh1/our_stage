import { Component, OnInit } from '@angular/core';
import { CreationPrescripteurService } from './CreationPrescripteur.service';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { DatePipe } from '@angular/common';
import { Periode } from 'src/app/models/Periode';
import { Titre } from 'src/app/models/TitreDepense';
import { Rubrique } from 'src/app/models/Rubrique';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from '../Authentication/authentication.service';
import { Direction } from 'src/app/models/Direction';
import { Demande } from 'src/app/models/Demande';
import { UtilitaireService } from 'src/app/service/utilitaire.service';
import { SessionCd } from 'src/app/models/SessionCd';
@Component({
  selector: 'app-creation-prescripteur',
  templateUrl: './CreationPrescripteur.component.html',
  styleUrls: ['./CreationPrescripteur.component.scss'],
})
export class CreationPrescripteurComponent implements OnInit {
  role: string | null = '';
  token: string | null = '';
  nomDirection: string | null = '';
  idDirection?: Number;
  nomrefence=false;alert=false;
  //CREATION SESSION
  direction = new Direction(); // Valeur par défaut (ajuster selon vos besoins)
  // donnee PRESCRIPTEUR
  periodes: Periode[] = [];
  fournisseurs: Fournisseur[] = [];
  titres: Titre[] = [];
  rubriques: Rubrique[] = [];
  departement:string|null='';
  titresBr: any[] = [];
  titresAct: any[] = [];
  selectedTitleBr: string | undefined;
  selectedTitleAct: string | undefined;
  devises: any[] = [];
  refences: any[] = [];
  designation: string = '';
  texte: string = '';
  // valeur
  periode: any;
  estregularisation: boolean;
  idSession: any = '';
  idTitredepense: any = 1;
  motif: any;
  montantHt: any;

  demande = {
    estregularisation: '',
    typeReference: '',
    idRubrique: '',
    sousRubrique: '',
    motif: '',
    typeDevise: '',
    comsPrescripteur: '',
    idDirection: '',
    idTitreDepense: '',
    nomReference: '',
    fournisseur: '',
    montantHt: '',
    validationPrescripteur: false,
    idPeriode: '',
    idSession:'',
    depense:'',
    dateCreation:''
  };

  TitreDepense = {
    designation: '',
    idDirection: '',
  };
  
datePipe:DatePipe;
session=new SessionCd();
  errorStatus = false;
  errorMessage: string = '';
  idsession:string='';
  //  données ACHAT
  commentairesAch: string = '';
  afficherErreurNom: boolean = false;
  constructor(
    private CreationPrescripteurService: CreationPrescripteurService,
    private router: Router,
    private AuthenticationService: AuthenticationService,
    private utilitaire: UtilitaireService
  ) {
    this.estregularisation = false;
    this.token = sessionStorage.getItem("token");
    // this.idDirection = authServ.getIdDirectionByName();
    this.direction.id=-1;
    ///initialisaaiton date
    this.datePipe= new DatePipe('en-US');
  //RECUPERATION IdDirection                
    if(this.token !== null )
    {
      /*  ajout nom direction dans la sessionStorage */
        this.AuthenticationService.getUserInformation().subscribe(response =>
          {
              //recuperation role
              this.role = AuthenticationService.getRole(response['groups'])  ;
              console.log(this.role,"quel role");
              
              /* recuperation de l'id direction */
              
              this.nomDirection = AuthenticationService.getDirection(response['direction']);
              if(this.nomDirection !== null)
                {
                  this.AuthenticationService.getDirectionByName(this.nomDirection).subscribe(response =>{
                     this.direction = response;
                      this.direction.id = response.id;  
                      console.log('blaoohi',response);
                      console.log(this.direction.id,"direction id");
                      console.log("MYRESPONSE----------------");
                      console.log(response.designation);
                      this.departement=response.designation?.toString()??'';
                      //this.idsession=this.direction.id?.toString()??'';

                      //recuperation id session
                      console.log("data---------------------");
                      
                      this.utilitaire.getSessionByDirection(this.direction.id?.toString() ?? '').subscribe((data) => {
                        // console.log(this.idSession);

                          if(data !== null)
                          {
                            console.log(data);
                            this.session = data;
                            this.idsession=data.id?.toString() ?? '';
                            console.log(this.idsession,'sessionnnnnnnnnnnnnnnnnn////');
                          }
                  
                        //recuperation titre
                          this.utilitaire.getTitres(this.direction.id?.toString() ?? '',this.idSession).subscribe(
                            (resultAsTitres)=>{
                                console.log("resultAsTitres");
                              
                                console.log(resultAsTitres);
                                
                                this.titres = resultAsTitres ;
                            },
                            (error)=>{
                                error.log(error);
                            }
                            );
                        
                      });
                    });
                }
          });


    
    }
  }

  // submit bouton ouvrir session

  ngOnInit(): void {
    //recuperation titre
    
    // this.utilitaire.getTitres().subscribe((data) => {
    //   this.titres = data;
    // });
    this.demande.dateCreation=this.getormatdate()?.toString() ?? '';

    // recuperation ny fournisseur
    this.CreationPrescripteurService.getFournisseur().subscribe((data) => {
      this.fournisseurs = data;
    });

    // recuperation ny periode
    this.CreationPrescripteurService.getPeriode().subscribe((data) => {
      this.periodes = data;
    });
    //recuperation rubrique
    this.CreationPrescripteurService.getRubrique().subscribe((data) => {
      this.rubriques = data;
    });

    //  CREATE DEMANDE
    this.CreationPrescripteurService.createDemande(this.demande);
  }
  getDirectionId(): number | undefined {
    if (this.direction) {
      // Check if direction exists
      return this.direction.id;
    } else {
      return undefined; // Or a default value (e.g., -1) for filtering
    }
  }
  test(){
    console.log(this.demande,'reto demande');
    
  }
  showDetailsBr(title: string) {
    this.selectedTitleBr = title;
  }
  showDetailsAct(title: string) {
    this.selectedTitleAct = title;
  }
  creerDemande() {
      console.log(this.demande.dateCreation,'date creation');
      
    console.log(this.demande.depense);
    
    let missingField: keyof Demande | null = null; // Type for the missing field name

    if (!this.demande.typeDevise) {
      missingField = 'typeDevise' as keyof Demande; // Type assertion
    }
    if (!this.demande.motif) {
      missingField = 'motif' as keyof Demande;
    }
    if (!this.demande.idRubrique) {
      missingField = 'rubrique' as keyof Demande; // Type assertion
    }
    if (!this.demande.montantHt) {
      missingField = 'montantHt' as keyof Demande;
    }
    if (!this.demande.idPeriode) {
      missingField = 'periode' as keyof Demande;
    }

    if (missingField) {
      this.errorMessage = `Veuillez remplir le champ ${missingField}`; // More specific error message
      setTimeout(() => {
        this.errorMessage = ''; // Clear the error message after 3 seconds
      }, 3000);
    } else {
      this.demande.idDirection = this.direction.id?.toString() ?? '';
      console.log(this.demande.idDirection, 'ito n id direction ');
      // INSERTION DEMANDE par role
    if(this.role=="ACH" || this.role=="CDG"){
      this.demande.validationPrescripteur=true;
      console.log(this.idsession,"session anidroany");
      
      this.demande.idSession=this.idsession;
      console.log("achat ou prescripteur zany",this.demande.validationPrescripteur);
      console.log(this.demande.idSession,"itosession ");
      
    }
      this.CreationPrescripteurService.createDemande(this.demande).subscribe(
        (response) => {
          // Gérer la réponse du jeton avec succès
          console.log(' reçu:', response);
          console.log('\n\n\n\n\n\n');
          //window.location.reload();
          this.alert=true;
          this.errorMessage = 'Demande Enregistré!';
          this.demande.estregularisation= '';
          this.demande.typeReference= '';
          this.demande.idRubrique= '';
          this.demande.sousRubrique= '';
          this.demande.motif= '';
          this.demande.typeDevise= '';
          this.demande.comsPrescripteur= '';
          this.demande.idTitreDepense= '';
          this.demande.nomReference= '';
          this.demande.fournisseur= '';
          this.demande.montantHt= '';
         this.demande.idPeriode= '';
         this.demande.depense='';
         console.log('mety vide');
          setTimeout(() => {  
            this.alert=false;
            // Hide the message by setting errorStatus to false
            this.errorMessage = ''; // Optionally, clear the error message
          }, 3000);
        },
        (error) => {
          // Gérer les erreurs pendant la requête
          console.error("Erreur lors de l'obtention du jeton:", error);
        }
      );
    }
  }
  getormatdate(){
    const date= new Date();
    return this.datePipe.transform(date,'yyyy-MM-dd');  
  }
  //ajout option
  ajoutOpt(id: any, text: string) {
    const selectelement = document.getElementById('idtitre');
    const newOpt = document.createElement('option');
    newOpt.value = id;
    newOpt.text = text;

    if (selectelement !== null) {
      selectelement.appendChild(newOpt);
      newOpt.selected = true;
      this.demande.idTitreDepense = id;
    }
  }
  // set coms achat
  setComsAchat() {}
  //Ajout titre
  //

  //Ajout titre
  Ajouttitre() {
    console.log(this.TitreDepense.designation);

    this.TitreDepense.idDirection = this.direction.id?.toString() ?? '';
    console.log(this.TitreDepense.idDirection);
    console.log(this.TitreDepense.idDirection, 'id direction ooooo');
    this.CreationPrescripteurService.posttitre(this.TitreDepense).subscribe(
      (response) => {
        console.log(response);
        this.ajoutOpt(response.id, response.designation);
        
      }
    );
  }
  refencedemande(){
    
      this.nomrefence=true;
}
precedent(){
  this.router.navigate(['/main/MenuDemande']);
}
}
