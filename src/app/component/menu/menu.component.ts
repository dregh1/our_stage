import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { Brouillon } from 'src/app/models/Brouillon';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  heure:Date=new Date();
  role: string = 'prescripteur';
  brouillons : Brouillon [] = [];
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
}

}
