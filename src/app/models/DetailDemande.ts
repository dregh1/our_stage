export class DetailDemande{
    constructor(
        public id?:number,
        public  idtitre?:number,
        public titre?:string,
        public  motif?: string,
        public  montantht?:string ,
        public  typereference?:string,
        public  reference?:string,  
        public  estregularisation?:boolean ,
        public iddirection?:number,
        public  comsprescripteur?:string,
        public  idrubrique ?:number,
        public  fournisseur?:string,
        public  nomRubrique?:string ,
        public  sousrubrique ?:string,
        public  idperiode ?:number,
        public  periode ?:string,
        public  devise ?:string,
        public validationprescripteur ?:boolean,
        public  validationcdg ?:boolean ,
        public validationachat ?:boolean,
        public  idfournisseur ?:number,
    ){}
    }
       
      
    