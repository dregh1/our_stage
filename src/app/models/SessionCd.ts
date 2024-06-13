export class SessionCd {
  constructor(
    public id?: number,
    public ref?: string,
    public dateCloture?: Date,
    public dateDebut?: string,
    public dateFermeture?: string,
    //public idDirection?: Number,
    public estFerme?: boolean,
    public tauxEur?: Number,
    public tauxUsd?: Number,
    public tauxMga?: Number
  ) {}
}
