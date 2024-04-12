


export class Active_dmd {
    constructor(
        public id  : number,
        public id_titre : number,
        public titre : string,
        public motif : string,
        public montant_ht : number,
        public is_regularisation : boolean,
        public coms_prescripteur : string,
        public id_periode : number,
        public periode : string,
        //public id_direction : number,
        public direction : string,
        public id_devise : number,
        public devise : string,
        //public id_fournisseur : number,
        public fournisseur : string,
        public id_session : number ,
        public etat_session : boolean,
        public rubrique:string,
        public id_rubriques : number, 
        public sousrubrique:string
      // Autres propriétés de votre modèle de données personnel
    ) {}
  }
  