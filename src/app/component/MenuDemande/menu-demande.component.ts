import { Component, OnInit } from '@angular/core';
import { MenuDemandeService } from './menu-demande.service';
import { Brouillon } from 'src/app/models/Brouillon';
import { Active } from 'src/app/models/Active';
import { AuthenticationService } from '../authentication copy/authentication.service';
import { DetailDemande } from 'src/app/models/DetailDemande';
@Component({
  selector: 'app-menu-demande',
  templateUrl: './menu-demande.component.html',
  styleUrls: ['./menu-demande.component.scss']
})
export class MenuDemandeComponent implements OnInit {
  role : string | null='';
  token : string | null = '' ;
  DetailDemande : DetailDemande [] = [];
  actives: Active[]=[];
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

  constructor(private MenuDemandeService:MenuDemandeService,private autheticationServ : AuthenticationService){
    this.token = sessionStorage.getItem("token");
    if(this.token !== null )
    {
      this.autheticationServ.getUserInfo(this.token);
      this.role = sessionStorage.getItem("role");
      // sessionStorage.removeItem("role");
      // window.location.reload();
    }
    
    //getbytitre
    
  }

  ngOnInit(): void {
    
   ///maka brouillon
    this.MenuDemandeService.getBrouillon().subscribe(DetailDemande => {
      this.DetailDemande = DetailDemande;
      console.log(DetailDemande);
      
    });
    // //maka active
    // this.MenuDemandeService.getdmdactive().subscribe(Response => {
    //   this.actives = Response;
    // });
}

getIdOfDirection (nomDirection  : string ) 
    {
      const nomDirectionn  : string = "DTI";
      
      this.autheticationServ.getDirectionByName(nomDirection)
              .subscribe(response => {
                              console.log( response);
                            }
                        ); 
      console.log(nomDirection);
    }
    
}
