
 // donnee PRESCRIPTEUR
 import { Component, OnInit, Renderer2, ElementRef} from '@angular/core';
 import { ActivatedRoute ,Router} from '@angular/router';
 import { Demande } from 'src/app/models/Demande';
 import { Titre } from 'src/app/models/TitreDepense';
 import { Brouillon } from 'src/app/models/Brouillon';
 import { Periode } from 'src/app/models/Periode';
 import { Fournisseur } from 'src/app/models/Fournisseur';
 import { AffichageService } from './affichage.service';
import { Rubrique } from 'src/app/models/Rubrique';
 @Component({
  selector: 'app-affichage-prescri',
  templateUrl: './affichage-prescri.component.html',
  styleUrls: ['./affichage-prescri.component.scss']
})
export class AffichagePrescriComponent implements OnInit {
   role: string = 'prescripteur';
   isUp1 = false; // Initial state for first button
   isUp2 = false; // Initial state for second button
   isUp3 = false;
   item:any;errorMessage:string='';
   rubriques:Rubrique[]=[];
   periodes: Periode[]=[];errorStatus = false;errorStatus1 = false;errorStatus2 = false;
   demande
     ={
         validationPrescripteur:false,
         estRegularisation    :'',
         typeReference : '',
         idRubrique:'',
         motif               : '',
         typeDevise : '',
         comsPrescripteur :'',
         idTitreDepense    : '',
         Reference : '',
         idFournisseur      :'',
         montantHt          :'',
       rubrique:'',
       sousRubrique:'',
         idPeriode          : '',
           idDirection:'',
           nomRubrique:'',
           fournisseur:'',
           periode:'',
           nomReference:''
         }  
   Titredepense =
   {
     designation :'',
   }
 id:number;type:string='';devise:string='';
   titres : Titre[] = [];  fournisseurs : Fournisseur[] = [];
   brouillons = new Brouillon();
   demandes=new Demande();
  message:string='';
   constructor( private AffichageService:AffichageService,private activatedRoute: ActivatedRoute,private router:Router) {
    
     this.id = this.activatedRoute.snapshot.params['id'];
   
   }
   
   ngOnInit(): void {
     //maka titre
     this.AffichageService.getTitre().subscribe(data => {
       this.titres = data;
      
     });
      // maka ny periode
      this.AffichageService.getPeriode().subscribe(data => {
       this.periodes = data;
     });
     // maka ny fournisseur
     this.AffichageService.getFournisseur().subscribe(data => {
       this.fournisseurs = data;
     });
    // maka demande
     //  this.AffichageService.getdemande(this.id).subscribe(response=> {
     // this.demandes = response;
     //  this.demande.id_periode= this.demande.id_periode;
     // });
      //maka rubrique
  this.AffichageService.getRubrique().subscribe(data => {
    this.rubriques = data;
  });
     //  //maka titre
     //maka par detail
     this.AffichageService.getBrouillonbyId(this.id).subscribe(response=> {
       this.brouillons = response;
       this.demande.estRegularisation = this.brouillons.estRegularisation?.toString() ?? "";
        
       this.demande.typeReference= this.brouillons.typeReference ?? "";
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
       this.demande.idRubrique= this.brouillons.idRubrique?.toString() ??"";
      this.demande.rubrique=this.brouillons.nomRubrique?.toString() ??"";
      this.demande.sousRubrique=this.brouillons.sousRubrique?.toString()?? "";
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
             this.demande.idTitreDepense= unOption.value; 
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
   this.AffichageService.update(this.id,this.demande).subscribe(Response=>{
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
         this.AffichageService.update(this.id,this.demande).subscribe(Response=>{
 
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
  oup(){
    this.ajout =! this.ajout;
  }
  ajout=false;
  // nouveau(){
  //   this.demande.is_regularisation = "";
  //      this.demande.titre = "";
  //      this.demande.id_titre="";
  //      this.demande.type_reference =   "";
  //      this.type="";
  //      this.demande.nom_reference =  "";
  //      this.demande.motif = "";
  //      this.demande.type_devise = "";
  //      this.devise="";
  //      this.demande.coms_prescripteur = "";
  //      this.demande.fournisseur = "";
  //      this.demande.montant_ht = "";
  //      this.demande.periode =""; 
  //      this.demande.id_periode =""; 
  //      this.demande.id_direction = ""; 
  //      this.demande.id_fournisseur = ""; 
  //      this.demande.id_titre_depense = ""; 
  //      this.demande.id_rubrique="";
  //      this.demande.rubrique="";
  //      this.demande.Sousrubrique="";
  //      console.log("vide");
  //      this.ajout =! this.ajout;
  // }
  
  //suppression
 //  delete():void{
 //   this.AffichageService.delete(this.id,this.demande).subscribe(Response=>{
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
   
 
   this.AffichageService.posttitre(this.Titredepense)
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
 
 
 
 ////////////////////
 //this.AffichageService.getDemandeById(this.DemandeId).subscribe(demande=>{
   //this.demande=demande;
  // });
 }