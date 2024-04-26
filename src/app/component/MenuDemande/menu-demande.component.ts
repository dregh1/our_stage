import { Component, OnInit } from '@angular/core';
import { MenuDemandeService } from './menu-demande.service';
import { AuthenticationService } from '../authentication copy/authentication.service';
import { DetailDemande } from 'src/app/models/DetailDemande';
import { Direction } from 'src/app/models/Direction';
@Component({
  selector: 'app-menu-demande',
  templateUrl: './menu-demande.component.html',
  styleUrls: ['./menu-demande.component.scss']
})
export class MenuDemandeComponent implements OnInit {
  role : string | null='';
  token : string | null = '' ;
  DetailDemande : DetailDemande [] = [];
  
  nomDirection : string | null ='';
  //CREATION SESSION
  direction = new Direction();
// brouillon={
//   titre : '',
//  montant_ht : '',
//  is_regularisation : '',
//   coms_prescripteur : '',
//    periode : '',
//   direction : '',
//  devise : '',
//   fournisseur :'',
// }
text:string='';
  constructor(private MenuDemandeService:MenuDemandeService,private autheticationServ : AuthenticationService){
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
    
    //getbytitre
    
  }


  ngOnInit(): void {
   ///maka brouillon
    this.MenuDemandeService.getBrouillon().subscribe(DetailDemande => {
      this.DetailDemande = DetailDemande;
      console.log(DetailDemande);
      this.text
    });
    // //maka active
    // this.MenuDemandeService.getdmdactive().subscribe(Response => {
    //   this.actives = Response;
    // });
}

// getIdOfDirection (nomDirection  : string ) 
//     {
//       const nomDirectionn  : string = "DTI";
      
//       this.autheticationServ.getDirectionByName(nomDirection)
//               .subscribe(response => {
//                               console.log( response);
//                             }
//                         ); 
//       console.log(nomDirection);
//     }
    
}
