import { Component, OnInit } from '@angular/core';
import { groupBy} from 'rxjs';
import { CommonModule } from '@angular/common';
import { MenuService } from './menu.service';
import { Brouillon } from 'src/app/models/Brouillon';
import { Active } from 'src/app/models/Active';
import { AuthenticationService } from '../authentication copy/authentication.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  role : string | null='';
  token : string | null = '' ;
  brouillons : Brouillon [] = [];
  actives: Active[]=[];
// brouillon={
//   titre : '',
//    motif : '',
//  montant_ht : '',
//  is_regularisation : '',
//   coms_prescripteur : '',
//    periode : '',
//   direction : '',
//  devise : '',
//   fournisseur :'',
// }

  constructor(private MenuSerice:MenuService,private autheticationServ : AuthenticationService){
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
    this.MenuSerice.getBrouillon().subscribe(brouillons => {
      this.brouillons = brouillons;
    });
    //maka active
    this.MenuSerice.getdmdactive().subscribe(Response => {
      this.actives = Response;
    });
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
