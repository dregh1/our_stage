

export class Demande {
    constructor(
         public id :Number,
         public id_session :Number,
         public id_titre_depense :Number,
         public motif :String,
         public id_fournisseur :Number,
         public montant_ht :Number,
         public id_rubrique :Number,
         public id_sousrubrique :Number,
         public is_regularisation :boolean,
         public id_periode :Number,
         public is_deleted:boolean,
      // Autres propriétés de votre modèle de données personnel
    ) {}
  }
  