import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { Brouillon } from 'src/app/models/Brouillon';
import { Active_dmd } from 'src/app/models/Active_dmd';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  heure:Date=new Date();
  role: string = 'prescripteur';
  brouillons : Brouillon [] = [];
  actives: Active_dmd[]=[];
// brouillons={
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
  constructor(private MenuSerice:MenuService){
    
  }
 
  ngOnInit(): void {
   
    this.MenuSerice.getBrouillon().subscribe(brouillons => {
      this.brouillons = brouillons;
    });
    this.MenuSerice.getdmdactive().subscribe(Response => {
      this.actives = Response;
    });
}

}
