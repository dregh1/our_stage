

export class Demande {
    constructor(
         public id?:Number,
         public id_session? :Number,
         public id_titre_depense? :Number,
         public motif? :String,
         public id_fournisseur? :Number,
         public montant_ht? :Number,
         public id_rubrique? :Number,
         public id_sousrubrique? :Number,
         public is_regularisation? :boolean,
         public id_periode? :Number,
         public is_deleted?:boolean,   
        public coms_prescripteur? :String,
        public id_direction? :String,
        public type_reference? :String,
        public nom_reference? :String,
        public type_devise? :String,
      // Autres propriétés de votre modèle de données personnel
    ) {}
  }
  