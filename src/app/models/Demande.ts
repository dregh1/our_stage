

export class Demande {
    constructor(
         public id?:Number,
         public idsession? :Number,
         public idTitredepense? :Number,
         public motif? :String,
         public idFournisseur? :Number,
         public montantHt? :Number,
         public idRubrique? :Number,
         public Sousrubrique? :Number,
         public estRegularisation? :boolean,
         public estSupprimer? :boolean,
         public idPeriode? :Number, 
        public comsPrescripteur? :String,
        public iddirection? :String,
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
  