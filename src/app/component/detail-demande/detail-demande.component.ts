import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { Demande } from 'src/app/models/Demande';
import { Titre } from 'src/app/models/TitreDepense';
import { DetailDemandeService } from './detail-demande.service';
import { Brouillon } from 'src/app/models/Brouillon';
import { Periode } from 'src/app/models/Periode';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { AuthenticationService } from '../authentication copy/authentication.service';
import { Rubrique } from 'src/app/models/Rubrique';
@Component({
  selector: 'app-detail-demande',
  templateUrl: './detail-demande.component.html',
  styleUrls: ['./detail-demande.component.scss']
})
export class DetailDemandeComponent implements OnInit {

 
  role : string | null='';
  token : string | null = '' ;
  isUp1 = false; // Initial state for first button
  isUp2 = false; // Initial state for second button
  isUp3 = false;
  item:any;errorMessage:string='';
  periodes: Periode[]=[];errorStatus = false;errorStatus1 = false;errorStatus2 = false;
  demande
={
estregularisation    :'',
periode:'',
typeReference : '',
idRubrique:'',
Sousrubrique : '',
motif               : '',
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
validationPrescripteur:false

}
titredepense =
  {
    designation :'',
  }
  
id:number;type:string='';devise:string='';
  titres : Titre[] = [];  fournisseurs : Fournisseur[] = [];
  brouillons = new Brouillon();
  demandes=new Demande();rubriques :Rubrique[]=[];
 message:string='';
  constructor( private DetailDemandeService:DetailDemandeService,private autheticationServ:AuthenticationService,private activatedRoute: ActivatedRoute,private router:Router) {
    
    this.id = this.activatedRoute.snapshot.params['id'];
    this.token = sessionStorage.getItem("token");
    if(this.token !== null )
    {
      this.autheticationServ.getUserInfo(this.token);
      this.role = sessionStorage.getItem("role");
      // sessionStorage.removeItem("role");
      // window.location.reload();
    }
  }
  
  ngOnInit(): void {
    //maka titre
    this.DetailDemandeService.getTitre().subscribe(data => {
      this.titres = data;
     
    });
     // maka ny periode
     this.DetailDemandeService.getPeriode().subscribe(data => {
      this.periodes = data;
    });
    // maka ny fournisseur
    this.DetailDemandeService.getFournisseur().subscribe(data => {
      this.fournisseurs = data;
    });
    //maka rubrique
    this.DetailDemandeService.getRubrique().subscribe(data => {
      this.rubriques = data;
    });
   // maka demande
    //  this.DetailDemandeService.getdemande(this.id).subscribe(response=> {
    // this.demandes = response;
    //  this.demande.id_periode= this.demande.id_periode;
    // });
    
    //  //maka titre
    //maka par detail
    this.DetailDemandeService.getActiveId(this.id).subscribe(response=> {
      this.brouillons = response;
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
      this.demande.Sousrubrique=this.brouillons.sousRubrique?.toString() ?? ""; 
      this.demande.idRubrique=this.brouillons.idRubrique?.toString() ?? "";
      this.setSelected(this.demande.idTitreDepense);
  });
  }

  toggleUp() {
    this.isUp1 = !this.isUp1;
  }

  toggleDown() {
    this.isUp2 = !this.isUp2;
  }
 

  isUp = true; // Initial state

  toggleIcon() {
    this.isUp3 = !this.isUp3;
  }
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

valider():void{
  this.demande.validationPrescripteur = true;
  this.DetailDemandeService.update(this.id,this.demande).subscribe(Response=>{
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
 //modication
 update():void{
  
  console.log("moulle");
  console.log(this.demande);
        this.DetailDemandeService.update(this.id,this.demande).subscribe(Response=>{

          console.log(Response);
          this.message='updat!';
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
//   this.DetailDemandeService.delete(this.id,this.demande).subscribe(Response=>{
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

//Ajout titre
Ajouttitre() {
  

  this.DetailDemandeService.posttitre(this.titredepense)
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
  console.log("mbola tsy mandeh ny url");
    // this.DetailDemandeService.postCdg(this.id,this.demande).subscribe(Response=>{
  //   console.log(Response);

  //   this.message='updat!';
  // });
}


////////////////////
//this.DetailDemandeService.getDemandeById(this.DemandeId).subscribe(demande=>{
  //this.demande=demande;
 // });
}