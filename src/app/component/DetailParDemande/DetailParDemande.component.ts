import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { Demande } from 'src/app/models/Demande';
import { Titre } from 'src/app/models/TitreDepense';
import { Periode } from 'src/app/models/Periode';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { AuthenticationService } from '../authentication copy/authentication.service';
import { Rubrique } from 'src/app/models/Rubrique';
import { AvisCdg } from 'src/app/models/AvisCdg';
import { AvisAchat } from 'src/app/models/AvisAchat';
import { DetailDemande } from 'src/app/models/DetailDemande';
import { TesteService } from './DetailParDemande.service';
import { Direction } from 'src/app/models/Direction';
@Component({
  selector: 'app-test',
  templateUrl: './DetailParDemande.component.html',
  styleUrls: ['./DetailParDemande.component.scss']
})
export class TestComponent implements OnInit {
  role : string | null='';
  token : string | null = '' ;
  isUp1 = false; // Initial state for first button
  isUp2 = false; // Initial state for second button
  isUp3 = false;
  item:any;errorMessage:string='';
  periodes: Periode[]=[];errorStatus = false;errorStatus1 = false;errorStatus2 = false;
  demande
={
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
}
AvisCdg = {
  id:'',
  idDemande:'',
  commentaire:'',
  montantBudgetMensuel:'',
  montantEngage:'',
}
AvisAchat = {
  idDemande:'',
  commentaire:''
}
titredepense =
  {
    designation :'',
  }

  direction = new Direction();
  nomDirection : string | null ='';
id:number;  reliquat:number=0;
type:string='';devise:string='';
  titres : Titre[] = [];  fournisseurs : Fournisseur[] = [];
  DetailDemande= new DetailDemande();
  rubriques :Rubrique[]=[];aviscdgs=new AvisCdg();
  avisAchat=new AvisAchat();
 message:string='';
  constructor( private TesteService:TesteService,private autheticationServ:AuthenticationService,private activatedRoute: ActivatedRoute,private router:Router) {
    
    this.id = this.activatedRoute.snapshot.params['id'];
    this.token = sessionStorage.getItem("token");
    if(this.token !== null )
    {
      this.autheticationServ.getUserInfo(this.token);
      this.role = sessionStorage.getItem("role");
     }
     this.nomDirection = sessionStorage.getItem('direction');
                    
     if(this.nomDirection !== null)
     {
       
       this.autheticationServ.getDirectionByName(this.nomDirection).subscribe(response =>{ this.direction = response})
       this.direction.id = this.direction.id;    
     }
  }
  //calcul sur le reliquat
  calculerResultat() {
    this.reliquat = parseFloat(this.AvisCdg.montantBudgetMensuel)- parseFloat(this.AvisCdg.montantEngage);
  }
  ngOnInit(): void {
    
    //maka titre
    this.TesteService.getTitre().subscribe(data => {
      this.titres = data;
    });
     // maka ny periode
     this.TesteService.getPeriode().subscribe(data => {
      this.periodes = data;
    });
    // maka ny fournisseur
    this.TesteService.getFournisseur().subscribe(data => {
      this.fournisseurs = data;
    });
    //maka rubrique
    this.TesteService.getRubrique().subscribe(data => {
      this.rubriques = data;
    });
   
    // maka avisAchat
    this.TesteService.getAchatById(this.id).subscribe(response=> {
      this.avisAchat = response;
      this.AvisAchat.commentaire=this.avisAchat.commentaire?? "";
      });
      //  //maka titre
    //maka par detail
    this.TesteService.getDetailDemandebyId(this.id).subscribe(response=> {
      this.DetailDemande = response;
      console.log(response,"////////////////");
      this.demande.estRegularisation = Boolean(this.DetailDemande.estregularisation ?? "");
      this.demande.titre = this.DetailDemande.titre ?? "";
      this.demande.typeReference= this.DetailDemande.typereference?? "";
      // this.demande.typereference=this.demande.typereference;
      this.demande.nomReference = this.DetailDemande.reference?? "";
      this.demande.motif = this.DetailDemande.motif ?? "";
      this.demande.typeDevise = this.DetailDemande.devise ?? "";
      this.demande.devise=this.DetailDemande.devise ?.toString() ?? "";
      this.demande.comsPrescripteur = this.DetailDemande.comsprescripteur ?? "";
      this.demande.fournisseur = this.DetailDemande.fournisseur ?? "";
      this.demande.montantHt = this.DetailDemande.montantht?.toString() ?? "";
      this.demande.periode = this.DetailDemande.periode ?? ""; 
      this.demande.idPeriode = this.DetailDemande.idperiode?.toString() ?? ""; 
      this.demande.idDirection = this.DetailDemande.iddirection?.toString() ?? ""; 
      this.demande.idFournisseur = this.DetailDemande.idfournisseur?.toString() ?? ""; 
      this.demande.idTitreDepense = this.DetailDemande.idtitre?.toString() ?? ""; 
      this.demande.sousRubrique=this.DetailDemande.sousrubrique?.toString()?? "";
      this.demande.idRubrique=this.DetailDemande.idrubrique?.toString() ?? "";
      this.demande.validationPrescripteur=Boolean(this.DetailDemande.validationprescripteur??"");
      this.demande.validationCdg=Boolean(this.DetailDemande.validationcdg??"");
      this.demande.validationAchat=Boolean(this.DetailDemande.validationachat??"");
      console.log(this.DetailDemande);
      this.setSelected(this.demande.idTitreDepense);
      console.log(this.DetailDemande.sousrubrique,"io brouilon");
      console.log(this.demande.fournisseur,"ourinisseurs");
  });
     //////////Affichage du commentaire Cdg
     this.TesteService.getCdgById(this.id).subscribe(response=> {
      this.aviscdgs = response;
      console.log(response,"/:///.////././");
      
    console.log(this.aviscdgs);
    this.AvisCdg.id=this.aviscdgs.id?.toString() ?? "";
    this.AvisCdg.commentaire = this.aviscdgs.commentaire?? "";
    this.AvisCdg.montantBudgetMensuel=this.aviscdgs.montantBudgetMensuel?.toString() ?? "";
    this.AvisCdg.montantEngage=this.aviscdgs.montantEngage?.toString() ?? "";
    this.reliquat=parseFloat(this.AvisCdg.montantBudgetMensuel)-parseFloat(this.AvisCdg.montantEngage);
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
  console.log(this.demande.validationPrescripteur);
  this.update();
}
 //modication prescripteur
 update():void{
  console.log("moulle");
  console.log(this.demande);
        this.TesteService.update(this.id,this.demande).subscribe(Response=>{
          console.log(Response);
          this.message='modié!';
        });
        this.errorMessage='Demande modié!';
        setTimeout(() => {
          this.errorStatus1 = false; // Hide the message by setting errorStatus to false
          this.errorMessage = '';    // Optionally, clear the error message
        }, 3000);
        console.log(this.message);
        // window.location.reload();
 }
 //suppression
//  delete():void{
//   this.TesteService.delete(this.id,this.demande).subscribe(Response=>{
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
  this.TesteService.posttitre(this.titredepense)
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
  this.TesteService.postCdg(this.AvisCdg).subscribe(Response=>{
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
  this.AvisCdg.idDemande=this.id?.toString() ?? "";
  this.TesteService.updateCdg(parseFloat(this.AvisCdg.id),this.AvisCdg).subscribe(Response=>{
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
  this.update();
}
//enregistrement achat
EnregistrerAchat(){
  this.AvisAchat.idDemande=this.id?.toString() ?? "";
  console.log(this.AvisAchat);
  this.TesteService.postAchat(this.AvisAchat).subscribe(Response=>{
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
  this.update();
}
}
