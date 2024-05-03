import { Component, OnInit } from '@angular/core';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { ConsultationService } from './consultation.service';
import { DetailDemande } from 'src/app/models/DetailDemande';
import { Direction } from 'src/app/models/Direction';
import { SessionCd } from 'src/app/models/SessionCd';
import { Observable } from 'rxjs';
import { DonneeExcel } from 'src/app/models/DonneExcel';
@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
})
export class ConsultationComponent implements OnInit {
  demande = {
    statut: '',
    SessionCd: '',
    idFournisseur: '',
    idDirection: '',
    fournisseurs: '',
    motif: '',
    datedebut: '',
    datefin: '',
    idsession: '',
  };

  DonneExcels: DonneeExcel[] = [];
  title = 'angular-excel-export';
  allDetails: DetailDemande[] = [];
  fournisseurs: Fournisseur[] = [];
  directions: Direction[] = [];
  sessioncd: SessionCd[] = [];
  constructor(private consultationService: ConsultationService) {}

  ngOnInit(): void {
    // maka ny fournisseur
    this.consultationService.getFournisseur().subscribe((data) => {
      this.fournisseurs = data;
    });
    // maka ny direction
    this.consultationService.getdirection().subscribe((data) => {
      this.directions = data;
    });
    //maka session
    this.consultationService.getsession().subscribe((data) => {
      this.sessioncd = data;
    });
    //GET all CONSULTATION (detailDemande)
    // this.consultationService.search("1","ok","on","2024-01-01","2024-08-01","CD-15121551","1").subscribe(data =>
    this.consultationService
      .search('', '', '', '', '', '', '')
      .subscribe((data) => {
        this.allDetails = data;
      });
  }

  rechercher(
    direction: string,
    statut: string,
    motif: string,
    dateDebut: string,
    dateFin: string,
    idsession: string,
    idFournisseur: string
  ) {
    this.consultationService
      .search(
        direction,
        statut,
        motif,
        dateDebut,
        dateFin,
        idsession,
        idFournisseur
      )
      .subscribe((data) => {
        this.allDetails = data;
      });
  }

  supprimer() {
    this.demande.idDirection = '';
    this.demande.statut = '';
    this.demande.idsession = '';
    this.demande.idFournisseur = '';
    this.demande.motif = '';
    this.demande.datedebut = '';
    this.demande.datefin = '';
    this.rechercher('', '', '', '', '', '', '');
  }

  //exporter excel
  exportToExcel(): void {
    //aectation données eccdel
    for (const detail of this.allDetails) {
      this.DonneExcels.push({
        Typereference: detail.typereference,
        Motif: detail.motif,
        Fournisseur: detail.fournisseur,
        Devise: detail.devise,
        MontantHt: detail.montantht,
        Commentaireprescripteur: detail.comsprescripteur,
        Periode: detail.periode,
        Regularisation: detail.estregularisation,
        commentaireCdg: detail.comsCdg,
        commentaireAchat: detail.comsAchat,
        Decision: detail.etatFinal,
        commentaireCd: detail.comsCd,
        MontantMga: detail.montantMga,
      });
    }
    this.consultationService.exportToExcel(this.DonneExcels, 'MyData.xlsx');
  }
}
