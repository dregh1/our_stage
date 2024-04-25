import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication copy/authentication.service';
import { Direction } from 'src/app/models/Direction';
import { ValidationService } from './validation.service';
import { Periode } from 'src/app/models/Periode';
import { Demande } from 'src/app/models/Demande';
import { Titre } from 'src/app/models/TitreDepense';
import { DetailDemande } from 'src/app/models/DetailDemande';
import { Fournisseur } from 'src/app/models/Fournisseur';
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
  direction = new Direction();
  nomDirection : string | null ='';
  fournisseurs : Fournisseur[] = [];
  periodes: Periode[]=[];
  demandes= new Demande();
  donnee=new Demande();   texte:String='';
  demande
  ={
    id:'',
      estRegularisation    :false,
      periode:'',
      idRubrique:'',
      sousRubrique : '',
      motif               : '',
      devise : '',
      typeDevise : '',
      comsPrescripteur :'',
      idDirection:'',
      idTitreDepense    : '',
      nomReference : '',
      titre:'',
      idFournisseur      :'',
      montantHt          :'',
      fournisseur:'',
      idPeriode          : '',
      validationPrescripteur:false,
      validationAchat:false,
      validationCdg:false,
      typeReference: '',
     idDemande:'',
    idperiode:'',
    idetatfinal:'',
    comsCd:''
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
    

    this.ajoutOpt(1,"m");

  }

  ngOnInit(): void {
    ///maka detaildemande
    this.ValidationService.getBrouillon().subscribe(DetailDemande => {
      this.DetailDemande = DetailDemande;
      //maka par detail
      console.log(DetailDemande);
    });

     // maka ny periode
     this.ValidationService.getPeriode().subscribe(data => {
      this.periodes = data;
    });
    
   ///maka decision
    // this.ValidationService.getcomsCdByid(this.id).subscribe(response=> {
    //   this.Decision = response;
    //   console.log(response,"////////////////");
    //   this.decision.commentaireCd = this.Decision ;
  
    //////////Affichage du commentaire Cdg
  //   this.ValidationService.getCdgById(this.DetailDemande.).subscribe(response=> {
  //     this.aviscdgs = response;
    
  //   // maka avisAchat
  //   this.ValidationService.getAchatById(this.id).subscribe(response=> {
  //     this.avisAchat = response;
  //     });
  // }

    }
    enregistrer(de:any){
      //miupdate demande session 
       //maka demande
     this.ValidationService.getdemande(de).subscribe(data => {
      this.demandes= data;
      this.donnee =this.demandes;
      console.log(de);
      
    });
   

      this.donnee.comsCd=this.demande.comsCd;
      this.donnee.idPeriode=parseInt(this.demande.idPeriode);
      console.log("aizoooooo",this.demande.comsCd);
      
      console.log(this.donnee);
       this.ValidationService.update(parseFloat(de),this.donnee).subscribe(Response=>{
        console.log(Response);
       });

    }
    ajoutOpt(id : any, text : string){
      const selectelement = document.getElementById("idtitre");
      const listOption = selectelement?.children ;
      console.log("-----------------------------------------");
      
      console.log(listOption);
      
      
        // for(const option of listOption )
        //   {

        //   }
        //   const newOpt = document.createElement("option");
        //   newOpt.value = id;
        //   newOpt.text = text;
     
        //   if(selectelement!==null)
        //   {
        //     selectelement.appendChild(newOpt);
        //     newOpt.selected = true;
        //     this.demande.idTitreDepense = id;
        //   };
        }
}

