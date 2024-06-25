import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
}
nomUtilisateur: string='';prenomUtilisateur: string='';
estChampVide = true;estChampVide1 = true;
boutonClique = false;

verifierChamp() {
  this.boutonClique = true;
  this.estChampVide = this.nomUtilisateur.trim().length === 0;
  this.estChampVide1= this.prenomUtilisateur.trim().length === 0;
}
}
