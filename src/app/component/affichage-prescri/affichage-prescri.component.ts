import { Component, OnInit } from '@angular/core';
import { Demande } from 'src/app/models/Demande';
import { AffichageService } from './affichage.service';
import { HttpClient } from '@angular/common/http';
import { Periode } from 'src/app/models/Periode';
import { Rubrique } from 'src/app/models/Rubrique';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { Sousrubrique } from 'src/app/models/Sousrubrique';
import { Brouillon } from 'src/app/models/Brouillon';
import { Active_dmd } from 'src/app/models/Active_dmd';
@Component({
  selector: 'app-affichage-prescri',
  templateUrl: './affichage-prescri.component.html',
  styleUrls: ['./affichage-prescri.component.scss']
})
export class AffichagePrescriComponent implements OnInit {
  DemandeId:number=1;
  //demande:Demande= {
     
   //  motif :'',
 //
 // };
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
  constructor(private AffichageService:  AffichageService) { 
    this.isregularisation = false;
      this.rubrique = null;
  }

  ngOnInit(): void {
    //Affichage demande
   // this.AffichageService.getDemandeById(this.DemandeId).subscribe(demande =>{
     // this.demande = demande;
    //  });
  }
  
}
