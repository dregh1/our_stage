import { Component, OnInit} from '@angular/core';
import { PrescripteurService } from './prescripteur.service';
import { Demande } from 'src/app/models/Demande';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { Periode } from 'src/app/models/Periode';
import { Brouillon } from 'src/app/models/Brouillon';
import { formatNumber } from '@angular/common';
import { of, distinct } from 'rxjs';
import { Titre } from 'src/app/models/titre';
import { Rubrique } from 'src/app/models/Rubrique';
import { Observable } from 'rxjs';
import { toArray } from 'rxjs/operators';

@Component({
  selector: 'app-creation-prescri',
  templateUrl: './creation-prescri.component.html',
  styleUrls: ['./creation-prescri.component.scss']
})
export class CreationPrescriComponent implements OnInit {
   // donnee PRESCRIPTEUR
   periodes: Periode[]=[];
   fournisseurs : Fournisseur[] = [];
   titres : Titre[] = [];
   brouillons : Brouillon [] = [];
   rubriques: Rubrique [] = [];
  
   active_dmds : Brouillon [] = [];
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
   isregularisation : boolean;  
   id_session : any = 3351;
   id_titre_depense : any =  1;
   motif : any;
   montant_ht : any;

   demande
   ={
   is_regularisation    :'',
 
   type_reference : '',
   id_rubrique:'',
   sousrubrique : '',
   motif               : '',
   type_devise : '',
   coms_prescripteur :'',
 
   id_titre_depense    : '',
   nom_reference : '',
 
   id_fournisseur      :'',
   montant_ht          :'',
 
   id_periode          : '',

  }
 
  titre_depense =
  {
    designation :'',
  }
  
  errorStatus = false;
  errorMessage : string='';
   //  données ACHAT
   commentairesAch : string = '';
   constructor(private prescripteurService : PrescripteurService)
    {
       this.isregularisation = false;
      }
    
    
   ngOnInit(): void {
    //maka titre
    this.prescripteurService.getTitre().subscribe(data => {
      this.titres = data;
    });
    
  
     // maka ny fournisseur
     this.prescripteurService.getFournisseur().subscribe(data => {
       this.fournisseurs = data;
     });
     
    
 
     // maka ny periode
     this.prescripteurService.getPeriode().subscribe(data => {
       this.periodes = data;
     });
     //maka rubrique
     this.prescripteurService.getRubrique().subscribe(data => {
      this.rubriques = data;
    });
    
 
     //maka ny reference
     this.prescripteurService.getReference().subscribe(data => {
       this.refences = data;
 
       console.log("references"); // ["Team Building", "sans titre"]
      
       console.log(this.refences); // ["Team Building", "sans titre"]
       
     });
 
      //maka ny devise
      this.prescripteurService.getDevise().subscribe(data => {
       this.devises = data;
 
       console.log("devises"); // ["Team Building", "sans titre"]
      
       console.log(this.devises); // ["Team Building", "sans titre"]
       
     });
 
     //  CREATE DEMANDE
     this.prescripteurService.createDemande(this.demande);
 
 
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
        "periode : "+this.demande.id_periode + "\n " + 
        //  "sousrubrique : "+this.demande.id_sousrubrique + "\n " + 
        "fournisseur : "+this.demande.id_fournisseur + "\n " + 
        "isregularisation : "+this.demande.is_regularisation  + "\n " +
        "devise" + this.demande.type_devise + " \n"+
        "id_titre_depense :  " + this.demande.id_titre_depense + " \n"+
        "motif" + this.demande.motif + " \n"+"ref" + this.demande.type_reference + " \n"+
        "commentaire" + this.demande.coms_prescripteur + " \n"+
        "montant_ht" + this.demande.montant_ht + " \n"+"ree" + this.demande.nom_reference + " \n"
        +"demande.id_titre_depense"+this.demande.id_titre_depense
      
     
       
       );
       // INSERTION DEMANDE
       this.prescripteurService.createDemande(this.demande)
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
          this.demande.id_titre_depense = id;
        };
   }
   // set coms achat
   setComsAchat(){
     
   }
   //Ajout titre
// 

  //Ajout titre
  Ajouttitre() {
  
    console.log(this.titre_depense.designation);
  
    this.prescripteurService.posttitre(this.titre_depense)
    .subscribe(response => {
                    console.log( response);
                    this.ajoutOpt(response.id , response.designation);
                  }
              ); 
  }
}
