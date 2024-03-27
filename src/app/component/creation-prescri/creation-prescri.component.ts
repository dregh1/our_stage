import { Component, OnInit } from '@angular/core';
import { PrescripteurService } from './prescripteur.service';
import { Demande } from 'src/app/models/Demande';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { Periode } from 'src/app/models/Periode';
import { Rubrique } from 'src/app/models/Rubrique';
import { Sousrubrique } from 'src/app/models/Sousrubrique';
import { Brouillon } from 'src/app/models/Brouillon';
import { formatNumber } from '@angular/common';
import { of, distinct } from 'rxjs';


@Component({
  selector: 'app-creation-prescri',
  templateUrl: './creation-prescri.component.html',
  styleUrls: ['./creation-prescri.component.scss']
})
export class CreationPrescriComponent implements OnInit {

   // donnee PRESCRIPTEUR
   periodes: Periode[]=[];
   rubriques: Rubrique[]=[];
   sousrubriques: Sousrubrique[]=[];
   fournisseurs : Fournisseur[] = [];
   brouillons : Brouillon [] = [];
   active_dmds : Brouillon [] = [];
   titresBr : any [] = [];
   titresAct : any [] = [];
   selectedTitleBr: string | undefined;
   selectedTitleAct: string | undefined;
   devises : any [] =  [];
   refences : any []= [];
 
   // valeur
 
   periode:any;
   rubrique:any;
   sousrubrique:any;
   fournisseur:any;
   isregularisation : boolean;  
   id_session : any = 3351;
   id_titre_depense : any =  1;
   motif : any;
   montant_ht : any;

   demande
   ={
   is_regularisation    :'',
 
   type_reference : '',
 
   motif               : '',
   type_devise : '',
   id_rubrique         :'',
   coms_prescripteur :'',
 
   id_titre_depense    : '',
   nom_reference : '',
 
   id_fournisseur      :'',
   montant_ht          :'',
   sousrubrique     :'',
 
   id_periode          : '',
 
 
   
 
  }
 
   //  données ACHAT
   commentairesAch : string = '';
 
 
 
   constructor(private prescripteurService : PrescripteurService)
    {
       this.isregularisation = false;
       this.rubrique = null;
    
       
 
     }
 
   ngOnInit(): void {
     // maka ny fournisseur
     this.prescripteurService.getFournisseur().subscribe(data => {
       this.fournisseurs = data;
     });
     
     // maka ny rubrique
     this.prescripteurService.getRubrique().subscribe(data => {
       this.rubriques = data;
     });
 
     // maka ny sousrubrique
     this.prescripteurService.getSousrubrique().subscribe(data => {
       this.sousrubriques = data;
     });
 
     // maka ny periode
     this.prescripteurService.getPeriode().subscribe(data => {
       this.periodes = data;
     });
 
      // maka ny brouillon
      this.prescripteurService.getBrouillon().subscribe(data => {
       this.brouillons = data;
 
       const uniqueTitles = Array.from(new Set(this.brouillons.map(obj => obj.titre)));
       this.titresBr = uniqueTitles;
       console.log(uniqueTitles); // ["Team Building", "sans titre"]
       
     });
 
 
     //maka ny Active_dmd
     this.prescripteurService.getActive().subscribe(data => {
       this.active_dmds = data;
 
       const uniqueTitles = Array.from(new Set(this.active_dmds.map(obj => obj.titre)));
       this.titresAct = uniqueTitles;
       console.log(uniqueTitles); // ["Team Building", "sans titre"]
       
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
     console.log( 
      "periode : "+this.demande.id_periode + "\n " + 
       "rubrique : "+this.demande.id_rubrique + "\n " 
       +  "rubrique : "+this.demande.sousrubrique + "\n " + 
      //  "sousrubrique : "+this.demande.id_sousrubrique + "\n " + 
       "fournisseur : "+this.demande.id_fournisseur + "\n " + 
       "isregularisation : "+this.demande.is_regularisation  + "\n " +
       "devise" + this.demande.type_devise + " \n"+
       "id_titre_depense" + this.id_titre_depense + " \n"+
       "motif" + this.demande.motif + " \n"+"ref" + this.demande.type_reference + " \n"+
       "commentaire" + this.demande.coms_prescripteur + " \n"+
       "montant_ht" + this.demande.montant_ht + " \n"+"ree" + this.demande.nom_reference + " \n"
 
       
     
       
       );
     
       
        this.prescripteurService.createDemande(this.demande)
        .subscribe(
           response  => {
             // Gérer la réponse du jeton avec succès
             console.log(' reçu:', response);
             console.log('\n\n\n\n\n\n');
             
           },
           error => {
             // Gérer les erreurs pendant la requête
             console.error('Erreur lors de l\'obtention du jeton:', error);
            
           }
        );
 
   }
   // set coms achat
   setComsAchat(){
     
   }
 
 }
 
