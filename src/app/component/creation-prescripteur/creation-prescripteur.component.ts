import { Component, OnInit } from '@angular/core';
import { CreationPrescripteurService } from './creation-prescripteur.service';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { Periode } from 'src/app/models/Periode';
import { Titre } from 'src/app/models/TitreDepense';
import { Rubrique } from 'src/app/models/Rubrique';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from '../authentication copy/authentication.service';
import { Direction } from 'src/app/models/Direction';
import { Demande } from 'src/app/models/Demande';
@Component({
  selector: 'app-creation-prescripteur',
  templateUrl: './creation-prescripteur.component.html',
  styleUrls: ['./creation-prescripteur.component.scss']
})
export class CreationPrescripteurComponent implements OnInit {
  token : string | null ;
  nomDirection : string | null ='';
  idDirection? : Number ;
  //CREATION SESSION
  direction = new Direction() ;// Valeur par défaut (ajuster selon vos besoins)
// donnee PRESCRIPTEUR
periodes: Periode[]=[];
fournisseurs : Fournisseur[] = [];
titres : Titre[]=[]; 
rubriques: Rubrique [] = [];

titresBr : any [] = [];
titresAct : any [] = [];
selectedTitleBr: string | undefined;
selectedTitleAct: string | undefined;
devises : any [] =  [];
refences : any []= [];
designation:string='';
texte:string='';
// valeur
periode:any;
estregularisation : boolean;  
idSession : any = 3351;
idTitredepense : any =  1;
motif : any;
montantHt : any;

demande
={
estregularisation    :'',

typeReference : '',
idRubrique:'',
sousRubrique : '',
motif               : '',
typeDevise : '',
comsPrescripteur :'',
idDirection:'',
idTitreDepense    : '',
nomReference : '',
idFournisseur      :'',
montantHt          :'',

idPeriode          : '',

}

TitreDepense =
{
 designation :'',
 idDirection:''
}

errorStatus = false;
errorMessage : string='';
//  données ACHAT
commentairesAch : string = '';
constructor(private CreationPrescripteurService : CreationPrescripteurService,private router:Router,private AuthenticationService:AuthenticationService)
 {  
    this.estregularisation = false;
    this.token = sessionStorage.getItem("token");
    // this.idDirection = authServ.getIdDirectionByName();
    this.direction.id=-1;
  //RECUPERATION IdDirection                
    if(this.token !== null )
    {
      /*  ajout nom direction dans la sessionStorage */
        this.AuthenticationService.getUserInfo(this.token);

      /* recuperation de l'id direction */
        this.nomDirection = sessionStorage.getItem('direction');
        
        if(this.nomDirection !== null)
        {
          this.AuthenticationService.getDirectionByName(this.nomDirection).subscribe(response =>{ this.direction = response});
        }
    
    }
    this.nomDirection = sessionStorage.getItem('direction');
                    
    if(this.nomDirection !== null)
    {
      
      this.AuthenticationService.getDirectionByName(this.nomDirection).subscribe(response =>{ this.direction = response})
      this.direction.id = this.direction.id;    
    }
    
   }
 
   // submit bouton ouvrir session

ngOnInit(): void {
 //maka titre
 this.CreationPrescripteurService.getTitre().subscribe(data => {
   this.titres = data;
 });
 

  // maka ny fournisseur
  this.CreationPrescripteurService.getFournisseur().subscribe(data => {
    this.fournisseurs = data;
  });
  
 

  // maka ny periode
  this.CreationPrescripteurService.getPeriode().subscribe(data => {
    this.periodes = data;
  });
  //maka rubrique
  this.CreationPrescripteurService.getRubrique().subscribe(data => {
   this.rubriques = data;
 });
 

  //  CREATE DEMANDE
  this.CreationPrescripteurService.createDemande(this.demande);


}
getDirectionId(): number | undefined {
  if (this.direction) { // Check if direction exists
    return this.direction.id;
  } else {
    return undefined; // Or a default value (e.g., -1) for filtering
  }
}

showDetailsBr(title: string) {
  this.selectedTitleBr = title;
}
showDetailsAct(title: string) {
  this.selectedTitleAct = title;
}
creerDemande()
{
   // TEST SI LES VALEURS SONT PRETES
    console.log( 
     "periode : "+this.demande.idPeriode + "\n " + 
     "fournisseur : "+this.demande.idFournisseur + "\n " + 
     "isregularisation : "+this.demande.estregularisation  + "\n " +
     "devise" + this.demande.typeDevise + " \n"+
     "idTitreDepense :  " + this.demande.idTitreDepense + " \n"+
     "motif" + this.demande.motif + " \n"+"ref" + this.demande.typeReference + " \n"+
     "commentaire" + this.demande.comsPrescripteur + " \n"+
     "montantHt" + this.demande.montantHt + " \n"+"rerence" + this.demande.nomReference + " \n"
     +"idtitrdepense"+this.demande.idTitreDepense
   
  
    
    );
    this.demande.idDirection = this.direction.id?.toString() ?? "";  
    console.log(this.demande.idDirection,"ito n id direction ");
    // INSERTION DEMANDE
    this.CreationPrescripteurService.createDemande(this.demande)
    .subscribe(
       response  => {
         // Gérer la réponse du jeton avec succès
         console.log(' reçu:', response);
         console.log('\n\n\n\n\n\n');
         window.location.reload();
         this.errorMessage='Demande validé!';
         setTimeout(() => {
           this.errorStatus = false; // Hide the message by setting errorStatus to false
           this.errorMessage = '';    // Optionally, clear the error message
         }, 3000);
          
        },
       error => {
         // Gérer les erreurs pendant la requête
         console.error('Erreur lors de l\'obtention du jeton:', error);
        
       }
    );   

}


//ajout option
ajoutOpt(id : any, text : string){
 const selectelement = document.getElementById("idtitre");
     const newOpt = document.createElement("option");
     newOpt.value = id;
     newOpt.text = text;

     if(selectelement!==null)
     {
       selectelement.appendChild(newOpt);
       newOpt.selected = true;
       this.demande.idTitreDepense = id;
     };
}
// set coms achat
setComsAchat(){
  
}
//Ajout titre
// 

//Ajout titre
Ajouttitre() {

 console.log(this.TitreDepense.designation);
  this.TitreDepense.idDirection=this.direction.id?.toString() ?? "";
  console.log(this.TitreDepense.idDirection);
  console.log(this.TitreDepense.idDirection,"id direction ooooo");
 this.CreationPrescripteurService.posttitre(this.TitreDepense)
 .subscribe(response => {
                 console.log( response);
                 this.ajoutOpt(response.id , response.designation);
               }
           ); 
}
}
