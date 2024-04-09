
 // donnee PRESCRIPTEUR
 import { Component, OnInit, Renderer2, ElementRef} from '@angular/core';
 import { ActivatedRoute ,Router} from '@angular/router';
 import { Demande } from 'src/app/models/Demande';
 import { Titre } from 'src/app/models/titre';
 import { Brouillon } from 'src/app/models/Brouillon';
 import { Periode } from 'src/app/models/Periode';
 import { Fournisseur } from 'src/app/models/Fournisseur';
 import { AffichageService } from './affichage.service';
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
   periodes: Periode[]=[];errorStatus = false;errorStatus1 = false;errorStatus2 = false;
   demande
     ={
         is_valdby_pres:false,
         is_regularisation    :'',
         type_reference : '',
         id_rubrique:'',
         sousrubrique : '',
         motif               : '',
         type_devise : '',
         coms_prescripteur :'',
 
         id_titre_depense    : '',
         reference : '',
 
         id_fournisseur      :'',
         montant_ht          :'',
       
         id_periode          : '',
           titre:'',
           id_direction:'',
           id_titre:'',
           fournisseur:'',
           periode:'',
           nom_reference:''
         }  
   titre_depense =
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
     
     //  //maka titre
     //maka par detail
     this.AffichageService.getBrouillonbyId(this.id).subscribe(response=> {
       this.brouillons = response;
       this.demande.is_regularisation = this.brouillons.is_regularisation?.toString() ?? "";
       this.demande.titre = this.brouillons.titre ?? "";
       
       this.demande.type_reference = this.brouillons.type_reference ?? "";
       this.type=this.demande.type_reference;
       this.demande.nom_reference = this.brouillons.reference ?? "";
       this.demande.motif = this.brouillons.motif ?? "";
       this.demande.type_devise = this.brouillons.devise ?? "";
       this.devise=this.demande.type_devise ;
       this.demande.coms_prescripteur = this.brouillons.coms_prescripteur ?? "";
       this.demande.fournisseur = this.brouillons.fournisseur ?? "";
       this.demande.montant_ht = this.brouillons.montant_ht?.toString() ?? "";
       this.demande.periode = this.brouillons.periode ?? ""; 
       this.demande.id_periode = this.brouillons.id_periode?.toString() ?? ""; 
       this.demande.id_direction = this.brouillons.id_direction?.toString() ?? ""; 
       this.demande.id_fournisseur = this.brouillons.id_fournisseur?.toString() ?? ""; 
       this.demande.id_titre_depense = this.brouillons.id_titre?.toString() ?? ""; 
       this.setSelected(this.demande.id_titre_depense);
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
             this.demande.id_titre_depense = unOption.value; 
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
         this.demande.id_titre_depense = id;
       };
  }
 
 valider():void{
   this.demande.is_valdby_pres = true;
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
   
 
   this.AffichageService.posttitre(this.titre_depense)
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