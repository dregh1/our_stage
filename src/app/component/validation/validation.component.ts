import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication copy/authentication.service';
import { Direction } from 'src/app/models/Direction';
import { ValidationService } from './validation.service';
import { Periode } from 'src/app/models/Periode';
import { Titre } from 'src/app/models/TitreDepense';
import { DetailDemande } from 'src/app/models/DetailDemande';
import { AvisAchat } from 'src/app/models/AvisAchat';
import { AvisCdg } from 'src/app/models/AvisCdg';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { Rubrique } from 'src/app/models/Rubrique';
import { Decision } from 'src/app/models/decision';
@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {
  isUp1 = false; // Initial state for first button
  role : string | null='';
  token : string | null = '' ;
  DetailDemande : DetailDemande [] = [];
  Decision :Decision[]=[];
  direction = new Direction();
  nomDirection : string | null ='';
  titres : Titre[] = [];  fournisseurs : Fournisseur[] = [];
  aviscdg:AvisCdg [] = [];
  avisAchat:AvisCdg [] = [];periodes: Periode[]=[];
  decision={
    idDemande:'',
    idetatfinal:'',
    commentaireCd:''
  }
  errorMessage:string='';
  toggleUp() {
    this.isUp1 = !this.isUp1;
  }
  constructor(private autheticationServ:AuthenticationService,private ValidationService:ValidationService) { 
    this.token = sessionStorage.getItem("token");
    if(this.token !== null )
    {
      this.autheticationServ.getUserInfo(this.token);
      this.role = sessionStorage.getItem("role");


      this.nomDirection = sessionStorage.getItem('direction');
                    
      if(this.nomDirection !== null)
      {
        this.autheticationServ.getDirectionByName(this.nomDirection).subscribe(response =>{ this.direction = response})
        this.direction.id = this.direction.id;    
      }
    }
    
  }

  ngOnInit(): void {
    ///maka detaildemande
    this.ValidationService.getBrouillon().subscribe(DetailDemande => {
      this.DetailDemande = DetailDemande;
      console.log(DetailDemande);
    });

     // maka ny periode
     this.ValidationService.getPeriode().subscribe(data => {
      this.periodes = data;
    });
    ///mpost commentaire
    this.ValidationService.postCd(this.Decision).subscribe(Response=>{
      console.log(Response); console.log("ok");
      
      this.errorMessage='Demande enregistré!';
    });
    //////////Affichage du commentaire Cdg
  //   this.ValidationService.getCdgById(this.DetailDemande.).subscribe(response=> {
  //     this.aviscdgs = response;
    
  //   // maka avisAchat
  //   this.ValidationService.getAchatById(this.id).subscribe(response=> {
  //     this.avisAchat = response;
  //     });
  // }

    }
}
