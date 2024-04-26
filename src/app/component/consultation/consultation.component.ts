import { Component, OnInit } from '@angular/core';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { ConsultationService } from './consultation.service';
@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit {
demande={
  direction:'',
  statut:'',
  SessionCd:'',
  idFournisseur:'',
  fournisseurs:'',
  motif:'',
  datedebut:'',
  datefin:''
} 
fournisseurs : Fournisseur[] = [];
  constructor(private consultationService:ConsultationService) { }

  ngOnInit(): void {
     // maka ny fournisseur
     this.consultationService.getFournisseur().subscribe(data => {
      this.fournisseurs = data;
    });
  }
supprimer(){
  this.demande.direction = '';
  this.demande.statut='';
  this.demande.SessionCd='';
  this.demande.idFournisseur='';
  this.demande.motif='';
  this.demande.datedebut='';
  this.demande.datefin='';
  console.log('mety');
}
}
