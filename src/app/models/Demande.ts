export class Demande {
  constructor(
    public id?: number,
    public idsession?: number,
    public idTitreDepense?: number,
    public idDirection?: number,
    public motif?: string,
    public idFournisseur?: number,
    public montantHt?: number,
    public idRubrique?: number,
    public idSousrubrique?: number,
    public estRegularisation?: boolean,
    public estSupprimer?: boolean,
    public idPeriode?: number,
    public comsPrescripteur?: string,
    public sousRubrique?: string,
    public etatfinal?: string,
    public typeReference?: string,
    public nomReference?: string,
    public typeDevise?: string,
    public validationAchat?: boolean,
    public validationPrescripteur?: boolean,
    public validationCdg?: boolean,
    public etatFinal?: boolean,
    public comsCd?: string
  ) // Autres propriétés de votre modèle de données personnel
  {}
}
