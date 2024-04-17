import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { Demande } from 'src/app/models/Demande';
import { Titre } from 'src/app/models/TitreDepense';
import { DetailService } from './detail.service';
import { Brouillon } from 'src/app/models/Brouillon';
import { Periode } from 'src/app/models/Periode';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { AuthenticationService } from '../authentication copy/authentication.service';
import { Rubrique } from 'src/app/models/Rubrique';
import { AvisCdgModel } from 'src/app/models/AvisCdg';
import { AvisAchat } from 'src/app/models/AvisAchat';
import { demande } from './demande';
import { AvisCdg } from './AvisCdg';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  role : string | null='';
  token : string | null = '' ;
  isUp1 = false; // Initial state for first button
  isUp2 = false; // Initial state for second button
  isUp3 = false;
  item:any;errorMessage:string='';
  periodes: Periode[]=[];errorStatus = false;errorStatus1 = false;errorStatus2 = false;
@Input() demande!:demande;
@Input() AvisCdg!:AvisCdg;

AvisAchat = {
  idDemande:'',
  commentaire:''
}
titredepense =
  {
    designation :'',
  }
id:number;  reliquat:number=0;
type:string='';devise:string='';
  titres : Titre[] = [];  fournisseurs : Fournisseur[] = [];
  brouillons = new Brouillon();
  demandes=new Demande();rubriques :Rubrique[]=[];aviscdg=new AvisCdgModel();
  avisAchat=new AvisAchat();
 message:string='';
  constructor( private DetailService:DetailService,private autheticationServ:AuthenticationService,private activatedRoute: ActivatedRoute,private router:Router) {
    
    this.id = this.activatedRoute.snapshot.params['id'];
    this.token = sessionStorage.getItem("token");
    if(this.token !== null )
    {
      this.autheticationServ.getUserInfo(this.token);
      this.role = sessionStorage.getItem("role");
     }
     this.demande.validationAchat = false;
     this.demande.validationCdg=false;
  }
  //calcul sur le reliquat
  calculerResultat() {
    this.reliquat = parseFloat(this.AvisCdg.montantBudgetMensuel)- parseFloat(this.AvisCdg.montantEngage);
  }
  ngOnInit(): void {
    //maka titre
    this.DetailService.getTitre().subscribe(data => {
      this.titres = data;
    });
     // maka ny periode
     this.DetailService.getPeriode().subscribe(data => {
      this.periodes = data;
    });
    // maka ny fournisseur
    this.DetailService.getFournisseur().subscribe(data => {
      this.fournisseurs = data;
    });
    //maka rubrique
    this.DetailService.getRubrique().subscribe(data => {
      this.rubriques = data;
    });
   // maka aviscdg
     this.DetailService.getCdgById(this.id).subscribe(response=> {
    this.aviscdg = response;
    this.AvisCdg.commentaire=this.aviscdg.commentaire?? "";
    this.AvisCdg.montantBudgetMensuel=this.aviscdg.montantBudgetMensuel??"";
    this.AvisCdg.montantEngage=this.aviscdg.montantEngage??"";
    this.reliquat=parseFloat(this.AvisCdg.montantBudgetMensuel)-parseFloat(this.AvisCdg.montantEngage);
    });
    // maka avisAchat
    this.DetailService.getAchatById(this.id).subscribe(response=> {
      this.avisAchat = response;
      this.AvisAchat.commentaire=this.avisAchat.commentaire?? "";
      });
      //  //maka titre
    //maka par detail
    this.DetailService.getActiveId(this.id).subscribe(response=> {
      this.brouillons = response;
      console.log(response,"////////////////");
      this.demande.estregularisation = this.brouillons.estRegularisation?.toString() ?? "";
      this.demande.titre = this.brouillons.titre ?? "";
      this.demande.typeReference = this.brouillons.typeReference ?? "";
      this.type=this.demande.typeReference;
      this.demande.nomReference = this.brouillons.reference ?? "";
      this.demande.motif = this.brouillons.motif ?? "";
      this.demande.typeDevise = this.brouillons.devise ?? "";
      this.devise=this.demande.typeDevise ;
      this.demande.comsPrescripteur = this.brouillons.comsPrescripteur ?? "";
      this.demande.fournisseur = this.brouillons.fournisseur ?? "";
      this.demande.montantHt = this.brouillons.montantHt?.toString() ?? "";
      this.demande.periode = this.brouillons.periode ?? ""; 
      this.demande.idPeriode = this.brouillons.idPeriode?.toString() ?? ""; 
      this.demande.idDirection = this.brouillons.idDirection?.toString() ?? ""; 
      this.demande.idFournisseur = this.brouillons.idFournisseur?.toString() ?? ""; 
      this.demande.idTitreDepense = this.brouillons.idTitre?.toString() ?? ""; 
      this.demande.sousRubrique=this.brouillons.sousRubrique?.toString()?? "";
      this.demande.idRubrique=this.brouillons.idRubrique?.toString() ?? "";
      this.setSelected(this.demande.idTitreDepense);
      console.log(this.brouillons.sousRubrique,"io brouilon");
      console.log(this.demande.fournisseur,"ourin");
  });
  }
//toggle ieldsetprescripteur 
  toggleUp() {
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
  //ajout id titre 
  setSelected(id : string)
  {
    const selectelement = document.getElementById("idtitre");
    if(selectelement!==null)
    {
      const lesOptions = selectelement?.querySelectorAll('option');
        for(let i = 0 ; i < lesOptions.length ; i++)
        {
          const unOption =  lesOptions[i];
          if(unOption.value === id) 
          {
            console.log("TEHAKA",id);
            unOption.selected = true;
            this.demande.idTitreDepense = unOption.value; 
          }
        }
    };
   
  }
 //ajout option
 ajoutOpt(id : any, text : string){
  console.log(this.id);
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
//validation prescripteur
valider():void{
  this.demande.validationPrescripteur = true;
  this.DetailService.update(this.id,this.demande).subscribe(Response=>{
    console.log(Response);
    this.message='updat!';
  });
  this.errorMessage='Demande validé!';
  setTimeout(() => {
    this.errorStatus1 = false; // Hide the message by setting errorStatus to false
    this.errorMessage = '';    // Optionally, clear the error message
  }, 3000);
  console.log(this.message);
}
 //modication prescripteur
 update():void{
  console.log("moulle");
  console.log(this.demande);
        this.DetailService.update(this.id,this.demande).subscribe(Response=>{
          console.log(Response);
          this.message='modié!';
        });
        this.errorMessage='Demande enregistré!';
        setTimeout(() => {
          this.errorStatus1 = false; // Hide the message by setting errorStatus to false
          this.errorMessage = '';    // Optionally, clear the error message
        }, 3000);
        console.log(this.message);
        // window.location.reload();
 }
 //suppression
//  delete():void{
//   this.DetailService.delete(this.id,this.demande).subscribe(Response=>{
//     console.log(Response);
//     this.router.navigate(['/main/menu']);
//     this.message='delete!';
//   }, error =>{
//     console.log(error);
//   });
//  }
 // set coms achat
 setComsAchat(){
   
 }
 //Ajout titre
// 

//Ajout titre demande
Ajouttitre() {
  this.DetailService.posttitre(this.titredepense)
  .subscribe(response => {
                  console.log( response);
                  this.ajoutOpt(response.id , response.designation);      
                }
            );
            this.errorMessage='Demande enregistré!';
          setTimeout(() => {
            this.errorStatus2 = false; // Hide the message by setting errorStatus to false
            this.errorMessage = '';    // Optionally, clear the error message
          }, 3000); 
}
/////enregistrer cdg
enregistrerCdg(){
  //maka ID 
  this.AvisCdg.idDemande=this.id?.toString() ?? "";
  console.log(this.AvisCdg);
  this.DetailService.postCdg(this.AvisCdg).subscribe(Response=>{
    console.log(Response);
  this.errorMessage='Demande enregistré!';
  });
  setTimeout(() => {
    this.errorStatus1 = false; // Hide the message by setting errorStatus to false
    this.errorMessage = '';    // Optionally, clear the error message
  }, 3000);
  console.log(this.message);
}
///modificationcdg
modificationCdg(){
  this.DetailService.updateCdg(this.id,this.AvisCdg).subscribe(Response=>{
    console.log(Response);
  this.errorMessage='Demande modifié!';
  });
  setTimeout(() => {
    this.errorStatus1 = false; // Hide the message by setting errorStatus to false
    this.errorMessage = '';    // Optionally, clear the error message
  }, 3000);
  console.log(this.message);

}
//validationcdg
validationCdg() {
  this.demande.validationCdg = true;
  this.DetailService.update(this.id,this.demande).subscribe(Response=>{
    console.log(Response);

    this.message='validé cdg!';
  });
  this.errorMessage='Demande validé!';
  setTimeout(() => {
    this.errorStatus1 = false; // Hide the message by setting errorStatus to false
    this.errorMessage = '';    // Optionally, clear the error message
  }, 3000);
  console.log(this.message);
}
//enregistrement achat
EnregistrerAchat(){
  this.AvisAchat.idDemande=this.id?.toString() ?? "";
  console.log(this.AvisAchat);
  this.DetailService.postAchat(this.AvisAchat).subscribe(Response=>{
    console.log(Response); console.log("ok");
    
    this.errorMessage='Demande enregistré!';
  });
  setTimeout(() => {
    this.errorStatus1 = false; // Hide the message by setting errorStatus to false
    this.errorMessage = '';    // Optionally, clear the error message
  }, 3000);
  console.log(this.message);
}
///validation Achat
validationAchat(){
  this.demande.validationAchat=true;
  this.DetailService.update(this.id,this.demande).subscribe(Response=>{
    console.log(Response);
    this.message='validdé achat!';
  });
  this.errorMessage='Demande validé!';
  setTimeout(() => {
    this.errorStatus1 = false; // Hide the message by setting errorStatus to false
    this.errorMessage = '';    // Optionally, clear the error message
  }, 3000);
  console.log(this.message);
}
}