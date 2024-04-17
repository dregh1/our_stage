

export class Demande {
    constructor(
         public id?:Number,
         public idsession? :Number,
         public idTitredepense? :Number,
         public idDirection?:number,
         public motif? :String,
         public idFournisseur? :number,
         public montantHt? :Number,
         public idRubrique? :Number,
         public idSousrubrique? :Number,
         public estRegularisation? :boolean,
         public estSupprimer? :boolean,
         public idPeriode? :Number, 
         public comsPrescripteur? :String,
         public sousRubrique?:String,
        //public iddirection? :number,
        public typeReference? :String,
        public nomReference? :String,
        public typeDevise? :String,

        public validationAchat? :boolean,
        public validationPrescripteur? :boolean,
        public validationCdg? :boolean,
        public etatFinal? :boolean,
      // Autres propriétés de votre modèle de données personnel
    ) {}
  }
  