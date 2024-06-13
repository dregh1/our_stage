import { DetailDemande } from "./DetailDemande";

export class Demande {
  constructor(
    public id?: number,
    public idSession?: number,
    public idTitreDepense?: number,
    public idtitre?:number,
    public iddirection?: number,
    public motif?: string,
    public fournisseur?: string,
    public devise?:number,
    public montantht?: number,
    public idrubrique?: number,
    public sousrubrique?: string,
    public estregularisation?: boolean,
    public estSupprimer?: boolean,
    public idperiode?: number,
    public comsprescripteur?: string,
    public sousRubrique?: string,
    public depense?: string,
    public etatfinal?: string,
    public typereference?: string,
    public reference?:string,
    public nomReference?: string,
    public typeDevise?: string,
    public validationAchat?: boolean,
    public validationprescripteur?: boolean,
    public validationCdg?: boolean,
    public etatFinal?: boolean,
    public comsCd?: string,
    public estRefuseCdg?:boolean,
    public estRefuseAchat?:boolean,
    public estSoumis?:boolean,
    public identifiant?: string,
    public dateCreation?: string,
    public dateSoumission?: string,

  ) // Autres propriétés de votre modèle de données personnel
  {}

  // getDemande (detailDemande : DetailDemande): Demande{
  //   let demande = new  Demande () ;
  //    demande.id  = detailDemande.id;
  //    demande.idSession  = parseFloat((detailDemande.idSession)??'');
  //    demande.idTitreDepense  = detailDemande.idtitre;
  //    demande.idtitre  = detailDemande.idtitre;
  //    demande.iddirection  = detailDemande.iddirection;
  //    demande.motif  = detailDemande.motif;
  //    demande.fournisseur  = detailDemande.fournisseur;
  //    demande.devise  = detailDemande.devise;
  //    demande.montantht  = detailDemande.montantht;
  //    demande.idrubrique  = detailDemande.;
  //    demande.sousrubrique  = detailDemande.;
  //    demande.estregularisation  = detailDemande.;
  //    demande.estSupprimer  = detailDemande.;
  //    demande.idperiode  = detailDemande.;
  //    demande.comsprescripteur  = detailDemande.;
  //    demande.sousRubrique  = detailDemande.;
  //    demande.depense  = detailDemande.;
  //    demande.etatfinal  = detailDemande.;
  //    demande.typereference  = detailDemande.;
  //    demande.reference  = detailDemande.;
  //    demande.nomReference  = detailDemande.;
  //    demande.typeDevise  = detailDemande.;
  //    demande.validationAchat  = detailDemande.;
  //    demande.validationprescripteur  = detailDemande.;
  //    demande.validationCdg  = detailDemande.;
  //    demande.etatFinal  = detailDemande.;
  //    demande.comsCd  = detailDemande.;
  //    demande.estRefuseCdg  = detailDemande.;
  //    demande.estRefuseAchat  = detailDemande.;
  //    demande.estSoumis  = detailDemande.;
  //    demande.identifiant  = detailDemande.;
  //    demande.dateCreation  = detailDemande.;
  //    demande.dateSoumission  = detailDemande.;


  //   return demande;
  // }

}
