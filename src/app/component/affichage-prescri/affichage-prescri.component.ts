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
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-affichage-prescri',
  templateUrl: './affichage-prescri.component.html',
  styleUrls: ['./affichage-prescri.component.scss']
})
export class AffichagePrescriComponent implements OnInit {
 // donnee PRESCRIPTEUR
 periodes: Periode[]=[];
 fournisseurs : Fournisseur[] = [];
 //titres : Titre[] = [];
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
item: Demande | null = null;
  errorMessage: string | null = null;
  constructor(private AffichageService:  AffichageService,private route: ActivatedRoute,) { 
    this.isregularisation = false;
  }
  

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Access ID from route
    // this.apiService.getItemById(id).subscribe({
    //   next: (data) => (this.item = data),
    //   error: (error) => (this.errorMessage = error.message)
    // });
   
   
  }
   //Affichage demande
  // this.AffichageService.getDemandeById(this.DemandeId).subscribe(demande =>{
  //   this.rubrique = demande;
  //   });
    // maka ny periode
  
}
