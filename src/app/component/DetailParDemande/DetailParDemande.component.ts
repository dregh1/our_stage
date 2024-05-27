import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Titre } from 'src/app/models/TitreDepense';
import { Periode } from 'src/app/models/Periode';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { AuthenticationService } from '../Authentication/authentication.service';
import { Rubrique } from 'src/app/models/Rubrique';
import { AvisCdg } from 'src/app/models/AvisCdg';
import { AvisAchat } from 'src/app/models/AvisAchat';
import { DetailDemande } from 'src/app/models/DetailDemande';
import { TesteService } from './DetailParDemande.service';
import { Direction } from 'src/app/models/Direction';
import { Demande } from 'src/app/models/Demande';
import { UtilitaireService } from 'src/app/service/utilitaire.service';
import { SessionCd } from 'src/app/models/SessionCd';
@Component({
  selector: 'app-test',
  templateUrl: './DetailParDemande.component.html',
  styleUrls: ['./DetailParDemande.component.scss'],
})
export class TestComponent implements OnInit {

  existanceAvisAchat : boolean =false;
  existanceAvisCdg : boolean =false;


  role: string | null = '';
  token: string | null = '';
  isUp1 = true; // Initial state for first button
  isUp2 = true; // Initial state for second button
  isUp3 = true;
  item: any;
  errorMessage: string = '';
  periodes: Periode[] = [];
  errorStatus = false;
  errorStatus1 = false;
  errorStatus2 = false;

  demande = {
    estRegularisation: false,
    periode: '',
    idRubrique: '',
    sousRubrique: '',
    motif: '',
    devise: '',
    typeDevise: '',
    comsPrescripteur: '',
    idDirection: '',
    idTitreDepense: '',
    nomReference: '',
    titre: '',
    idFournisseur: '',
    montantHt: '',
    idSession:'',
    fournisseur: '',
    idPeriode: '',
    validationPrescripteur: false,
    validationAchat: false,
    validationCdg: false,
    typeReference: '',
    estRefuseCdg:false,
    estRefuseAchat:false,
    estSoumis:false,
    depense:'',
    dateCreation:'',
    identifiant:'',
    dateSoumission:''
  };
  departement:string | null='';
  titre = new Titre();


  AvisCdg = {
    id: '',
    idDemande: '',
    commentaire: '',
    montantBudgetMensuel: '',
    montantEngage: '',
  };
  AvisAchat = {
    id:'',
    idDemande: '',
    commentaire: '',
  };

  titredepense = {
    designation: '',
    idDirection : '',
    idSession : ''
  };

  direction = new Direction();
  nomDirection: string | null = '';
  id: number;
  reliquat: number = 0;
  type: string = '';
  devise: string = '';
  titres: Titre[] = [];
  fournisseurs: Fournisseur[] = [];
  DetailDemande = new DetailDemande();
  rubriques: Rubrique[] = [];
  aviscdgs = new AvisCdg();
  avisAchat = new AvisAchat();
  message: string = '';
  idsession:string='';
session=new SessionCd();
datePipe:DatePipe;
  ///variable recuperation session
  existanceSession : boolean= false;

somme='+';
  constructor(
    private testeService: TesteService,
    private autheticationServ: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilitaire:UtilitaireService
  ) {
    ///initialisaaiton date
    this.datePipe= new DatePipe('en-US');
    this.id = this.activatedRoute.snapshot.params['id'];
    
    // RECUPERATION ROLE , DIRECTION , NOM utilisateur
    this.token = sessionStorage.getItem('token');
    if (this.token !== null) {
      this.autheticationServ.getUserInformation().subscribe((response) => {
        
        this.role = this.autheticationServ.getRole(response['groups']);
        this.nomDirection=this.autheticationServ.getDirection(response['direction']);
        

        // recuperation de l' IDDIRECTION
        if(this.nomDirection !== null)
          {
            this.autheticationServ.getDirectionByName(this.nomDirection).subscribe(response =>{
               this.direction = response
                this.direction.id = response.id;
                this.departement=response.designation?.toString()??'';  
                console.log('blaoohi!!!!!!!!!!!!!!!!!',response);
    
                          ///recuperation session
                          this.testeService.checkSession(this.direction.id).subscribe((data) => {
                            console.log("------------ session ------------");
                            console.log(data);
                            
                            this.existanceSession= data;
                            console.log('existendjjgjg',this.existanceSession);
                            
                                      //this.idsession = this.direction.id?.toString() ?? '';
                                      //recuperation id session

                                      this.utilitaire.getSessionByDirection(this.direction.id?.toString() ?? '').subscribe((data) => {
                                        this.session = data;
                                        if(data!==null)
                                        {
                                          this.idsession=data.id?.toString() ?? '';
                                          console.log(this.idsession,'sessionnnnnnnnnnnnnnnnnn');
                                         
                                          console.log('////////directiontitre',this.direction.id);
                                          console.log('///////session titrz',this.idsession);
  
                                        }
                                        
                                          //RECUPERATION active
                                                this.testeService.GetTitreParSession(this.direction.id?.toString() ??'' ) .subscribe((donnees) => {
                                                  
                                                  this.titres = donnees;
                                                  console.log("--------------vvvvvvvv---------------");
                                                  console.log(this.titres,"io titre");
                                                 
                                                  
                                                });
                                      });

                          });

              });
             
            
          }

      });
      
    }
    
  }
  precedent()
{
  this.router.navigate(['/main/MenuDemande']);
}  //calcul sur le reliquat
  calculerResultat() {
    this.reliquat =
      parseFloat(this.AvisCdg.montantBudgetMensuel) -
      parseFloat(this.AvisCdg.montantEngage);
  }
  ngOnInit(): void {
    //verification avisCdg
    // this.utilitaire.checkAvisCdgByIdDemande("").subscribe((data) => {
    //   this.existanceAvisCdg = data;
    // });
       //check AvisCdg
       console.log(this.id,'id demande ty o');
            
       this.utilitaire.checkAvisCdgByIdDemande(this.id?.toString() ?? '').
       subscribe((result)=>{ this.existanceAvisCdg = result ;});
       console.log(this.existanceAvisCdg,'checkaviscdgbyiddemande');
 
       //check AvisAchat
       this.utilitaire.checkAvisAchatByIdDemande(this.id?.toString() ?? '').
       subscribe((result)=>{ this.existanceAvisAchat = result;
       });
    //recuperation titre
    // this.testeService.getTitre().subscribe((data) => {
    //   this.titres = data;
    // });
   
    // recuperation ny periode
    this.testeService.getPeriode().subscribe((data) => {
      this.periodes = data;
    });
    // recuperation ny fournisseur
    this.testeService.getFournisseur().subscribe((data) => {
      this.fournisseurs = data;
    });
    //recuperation rubrique
    this.testeService.getRubrique().subscribe((data) => {
      this.rubriques = data;
    });
   
    //  //recuperation titre

    //recuperation par detail
    this.testeService.getDetailDemandebyId(this.id).subscribe((response) => {
      this.DetailDemande = response;
      
     

      console.log(response, '//////////////// ito responsse');
      this.demande.estRegularisation = Boolean( this.DetailDemande.estregularisation ?? '');
      this.demande.titre = this.DetailDemande.titre ?? '';
      this.demande.typeReference = this.DetailDemande.typereference ?? '';
      // this.demande.typereference=this.demande.typereference;
      this.demande.nomReference = this.DetailDemande.reference ?? '';
      this.demande.motif = this.DetailDemande.motif ?? '';
      this.demande.typeDevise = this.DetailDemande.devise ?? '';
      this.demande.devise = this.DetailDemande.devise?.toString() ?? '';
      this.demande.comsPrescripteur = this.DetailDemande.comsprescripteur ?? '';
      this.demande.fournisseur = this.DetailDemande.fournisseur ?? '';
      this.demande.montantHt = this.DetailDemande.montantht?.toString() ?? '';
      this.demande.periode = this.DetailDemande.periode ?? '';
      this.demande.idPeriode = this.DetailDemande.idperiode?.toString() ?? '';
      this.demande.idDirection =this.DetailDemande.iddirection?.toString() ?? '';
      this.demande.idSession=this.DetailDemande.idSession?.toString() ?? '';
      this.demande.idTitreDepense = this.DetailDemande.idtitre?.toString() ?? '';
      this.demande.sousRubrique =this.DetailDemande.sousrubrique?.toString() ?? '';
      this.demande.idRubrique = this.DetailDemande.idrubrique?.toString() ?? '';
      this.demande.validationPrescripteur = Boolean( this.DetailDemande.validationprescripteur ?? '' );
      this.demande.validationCdg = Boolean( this.DetailDemande.validationcdg ?? '');
      this.demande.validationAchat = Boolean(this.DetailDemande.validationachat ?? '' );
      this.demande.estRefuseCdg=Boolean(this.DetailDemande.estRefuseCdg ?? '' );
      this.demande.estRefuseAchat=Boolean(this.DetailDemande.estRefuseAchat ?? '' );
      this.demande.estSoumis=Boolean(this.DetailDemande.estsoumis);
      this.demande.depense=this.DetailDemande.depense??'';
      this.demande.dateCreation=this.DetailDemande.dateCreation?.toString() ?? '';
      this.demande.identifiant=this.DetailDemande.identifiant?.toString()??'';
       console.log(this.DetailDemande);
       console.log('LLLOOGKOJ');
       console.log(this.demande,'demande iioiooo');
       
      this.setSelected(this.demande.idTitreDepense);
      // console.log(this.DetailDemande.sousrubrique, 'io brouilon');
      // console.log(this.demande.fournisseur, 'ourinisseurs')


    });
    
    //////////Affichage du commentaire Cdg
    this.testeService.getCdgById(this.id).subscribe((response) => {
      this.aviscdgs = response;
     // console.log(this.aviscdgs.id,'ito id cdg');
      //  console.log(this.AvisCdg.id, 'ID null');
        try{
        this.AvisCdg.id = this.aviscdgs.id?.toString() ?? '';
     // if (this.AvisCdg.id !==null) {
        this.AvisCdg.commentaire = this.aviscdgs.commentaire ?? '';
        this.AvisCdg.montantBudgetMensuel = this.aviscdgs.montantBudgetMensuel?.toString() ?? '';
        this.AvisCdg.montantEngage = this.aviscdgs.montantEngage?.toString() ?? '';
        this.reliquat = parseFloat(this.AvisCdg.montantBudgetMensuel) - parseFloat(this.AvisCdg.montantEngage);
      console.log(this.AvisCdg.id,'ito id');
    }catch(error){console.log(error);
    }

    
    },

     error=>{

      console.log(error);

      });


      // recuperation avisAchat
      this.testeService.getAchatById(this.id).subscribe((response) => {
        this.avisAchat = response;
        try{
        this.AvisAchat.id= this.avisAchat.id?.toString() ?? '';
        this.AvisAchat.commentaire = this.avisAchat.commentaire ?? '';
      }catch(error){console.log(error);
      }
      });
  }
  //toggle ieldsetprescripteur
  toggleUp() {
    this.somme='-';
    this.isUp1 = !this.isUp1;
  }
  //toggle CDG
  toggleDown() {
    this.isUp2 = !this.isUp2;
  }
  isUp = true; // Initial state
  //toggle ieldset aCHAT
  toggleIcon() {
    this.isUp3 = !this.isUp3;
  }
  getormatdate(){
    const date= new Date();
    return this.datePipe.transform(date,'yyyy-MM-dd');  
  }
  //ajout id titre
  setSelected(id: string) {
    const selectelement = document.getElementById('idtitre');
    if (selectelement !== null) {
      const lesOptions = selectelement?.querySelectorAll('option');
      for (let i = 0; i < lesOptions.length; i++) {
        const unOption = lesOptions[i];
        if (unOption.value === id) {
          console.log('TEHAKA', id);
          unOption.selected = true;
          this.demande.idTitreDepense = unOption.value;
        }
      }
    }
  }
  //ajout option
  ajoutOpt(id: any, text: string) {
    console.log(this.id);
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
  //validation prescripteur
  valider(): void {
    
    if(this.idsession===''){
      console.log('vide session');
    }else{
      console.log(this.idsession,'+///////////sessionnnn///////////////');
       this.demande.idSession=this.idsession;
       this.demande.dateSoumission=this.getormatdate()?.toString() ?? '';

       this.demande.validationPrescripteur = true;
        this.demande.estSoumis=false;
       console.log(this.demande,'demande vaovao');
       
       this.updatetitre();
       console.log(this.demande.estSoumis,'soumission');
       this.update();
       console.log(this.demande,'e mis datepipe');
      }
  
    
    
    //this.utilitaire.getTokenAdmin();
  }
  //modication prescripteur
  updatetitre(): void { 
    console.log(this.demande.idTitreDepense,'titredepense');
    console.log(this.idsession,'idsessionjjjjjj');
    
    //recuperation titre by id
    this.testeService.gettitreById(parseInt(this.demande.idTitreDepense)).subscribe((data) => {
      this.titre = data;
    console.log(this.titre,'ito ');
    this.titredepense.idDirection=this.titre.idDirection?.toString() ?? '';;
    this.titredepense.designation=this.titre.designation?.toString() ?? '';;
    this.titredepense.idSession = this.idsession ??"";
    console.log(this.titredepense,'juu');
            ///modication titre
            this.testeService.updatetitredepense(parseInt(this.demande.idTitreDepense), this.titredepense).subscribe((Response) => {
              console.log(Response);
              this.message = 'modié!';
            });
  });
    
    
   }
  

  //modication prescripteur
  update(): void {
    console.log('moulle');
    console.log(this.demande.idSession,'idsesssinkk');
    
    console.log(this.demande);
    this.testeService.update(this.id, this.demande).subscribe((Response) => {
      console.log(Response);
      this.message = 'modié!';
    });
    this.errorMessage = 'Demande modié!';
    setTimeout(() => {
      this.errorStatus1 = false; // Hide the message by setting errorStatus to false
      this.errorMessage = ''; // Optionally, clear the error message
    }, 3000);
    console.log(this.message);
    // window.location.reload();
  }
  //annuation prescripteur
  annulationprescripteur(){
    //this.enregistrerCdg();
    this.demande.validationPrescripteur = false;
    console.log(this.demande.validationPrescripteur);
    this.update();
  }
  //Ajout titre demande
  Ajouttitre() {
    this.titredepense.idSession = this.DetailDemande.idSession ??""; 
    this.testeService.posttitre(this.titredepense).subscribe((response) => {
      console.log(response);
      this.ajoutOpt(response.id, response.designation);
    });
    this.errorMessage = 'Demande enregistré!';
    setTimeout(() => {
      this.errorStatus2 = false; // Hide the message by setting errorStatus to false
      this.errorMessage = ''; // Optionally, clear the error message
    }, 3000);
  }
  /////enregistrer cdg
  enregistrerCdg() {
    let missingField: keyof AvisCdg | null = null; // Type for the missing field name

    if (!this.AvisCdg.montantBudgetMensuel) {
      missingField = 'montant budget mensuel' as keyof AvisCdg; // Type assertion
    }
    if (!this.AvisCdg.montantEngage) {
      missingField = 'montant engagé' as keyof AvisCdg;
    }
    
    if (missingField) {
      this.errorMessage = `Veuillez remplir le champ ${missingField}`; // More specific error message
      setTimeout(() => {
        this.errorMessage = ''; // Clear the error message after 3 seconds
      }, 3000);
    } else {
      setTimeout(() => {
        this.errorMessage = ''; // Clear the error message after 3 seconds
      }, 3000);
      //recuperation ID
      this.AvisCdg.idDemande = this.id?.toString() ?? '';
      console.log(this.AvisCdg);
      this.testeService.postCdg(this.AvisCdg).subscribe((Response) => {
        console.log(Response);
        this.AvisCdg.id = Response.id;
        //manova id cdg
        this.AvisCdg.commentaire = Response.commentaire ;
        this.AvisCdg.montantBudgetMensuel =Response.montantBudgetMensuel;
        this.AvisCdg.montantEngage = Response.montantEngage;
        this.reliquat = parseFloat(this.AvisCdg.montantBudgetMensuel) - parseFloat(this.AvisCdg.montantEngage);
        this.errorMessage = 'Demande enregistré!';
      });
      setTimeout(() => {
        this.errorStatus1 = false; // Hide the message by setting errorStatus to false
        this.errorMessage = ''; 
        this.utilitaire.checkAvisCdgByIdDemande(this.id?.toString() ?? '').
        subscribe((result)=>{ this.existanceAvisCdg = result ;});
        console.log(this.existanceAvisCdg,'checkaviscdgbyiddemande');
        // Optionally, clear the error message
      }, 3000);
      console.log(this.message);
    }
  }
  ///modificationcdg
  modificationCdg() {
    this.AvisCdg.idDemande = this.id?.toString() ?? '';
   console.log(this.AvisCdg.idDemande);
   
    console.log(this.AvisCdg.id,"io id");
    
    this.testeService.updateCdg(
      parseFloat(this.AvisCdg.id),
      this.AvisCdg
    ).subscribe((Response) => {
      console.log(Response);
      this.errorMessage = 'Demande modifié!';
    });
    setTimeout(() => {
      this.errorStatus1 = false; // Hide the message by setting errorStatus to false
      this.errorMessage = ''; // Optionally, clear the error message
    }, 3000);
    console.log(this.message);
  }
  //refuser cdg
  refuserCdg() {
   
    this.demande.estRefuseCdg = true;
    this.update();
    this.errorMessage='refusé';
  
  }
  //validationcdg
  validationCdg() {
    this.demande.validationCdg = true;
    this.update();
  }
   //annuation prescripteur
   annulationCdg(){
    //this.enregistrerCdg();
    this.demande.validationCdg = false;
    this.demande.estRefuseCdg=false;
    this.errorMessage='';
    this.update();
  }
  //enregistrement achat
  EnregistrerAchat() {
    let missingField: keyof AvisCdg | null = null; // Type for the missing field name

    if (!this.AvisAchat.commentaire) {
      missingField = 'montant budget mensuel' as keyof AvisCdg; // Type assertion
    } 
    if (missingField) {
      this.errorMessage = `Veuillez remplir le champ ${missingField}`; // More specific error message
      setTimeout(() => {
        this.errorMessage = ''; // Clear the error message after 3 seconds
      }, 3000);
    } else {
      setTimeout(() => {
        this.errorMessage = ''; // Clear the error message after 3 seconds
      }, 3000);
    
      this.AvisAchat.idDemande = this.id?.toString() ?? '';
      console.log(this.AvisAchat);
      this.testeService.postAchat(this.AvisAchat).subscribe((Response) => {
        console.log(Response);
        console.log('ok');
        this.AvisAchat.id= Response.id;
        this.AvisAchat.commentaire = Response.commentaire;
        this.errorMessage = 'Demande enregistré!';
      });
      setTimeout(() => {
        this.errorStatus1 = false; // Hide the message by setting errorStatus to false
        this.errorMessage = '';
                //check AvisAchat
                this.utilitaire.checkAvisAchatByIdDemande(this.id?.toString() ?? '').
                subscribe((result)=>{ this.existanceAvisAchat = result;
                });
        // Optionally, clear the error message
      }, 3000);
      console.log(this.message);
    }
  }
   ///modificationachat
   modificationAchat() {
    this.AvisAchat.idDemande = this.id?.toString() ?? '';

    this.testeService.updateAchat(
      parseFloat(this.AvisAchat.id),
      this.AvisAchat
    ).subscribe((Response) => {
      console.log(Response);
      this.errorMessage = 'Demande modifié!';
    });
    setTimeout(() => {
      this.errorStatus1 = false; // Hide the message by setting errorStatus to false
      this.errorMessage = ''; // Optionally, clear the error message
    }, 3000);
    console.log(this.message);
  }
  ///validation Achat
  validationAchat() {
    this.demande.validationAchat = true;
     this.update();
  }
  //refuser Achat
  refuserAchat() {
    this.demande.estRefuseAchat = true;
     this.update();
     this.errorMessage='refusé';
  }
    //annuation prescripteur
    annulationAchat(){
      //this.enregistrerCdg();
      this.demande.validationAchat = false;
      this.demande.estRefuseAchat=false;
      this.update();
      this.errorMessage='';
    }
    //recuperation idsession 
  //validation prescripteur
    test(){
      console.log(this.demande,'demand vaovao');
      
    }

    //supprimer demande
    supprimationDemande(){    
    console.log(this.id);

      this.testeService.supprimerDemande(this.id)
      .subscribe((response)=>{},(error)=>{console.log(error);
      });
      

      this.demande.estRegularisation=false;
      this.demande.idRubrique='';
      this.demande.idTitreDepense='';
      this.demande.comsPrescripteur='';
      this.demande.devise='';
      this.demande.idPeriode='';
      this.demande.depense='';
      this.demande.fournisseur='';
      this.demande.sousRubrique='';
      this.demande.typeDevise='';
      this.demande.dateCreation='';
    }

  }
