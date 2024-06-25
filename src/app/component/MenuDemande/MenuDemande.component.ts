import { Component, OnInit } from '@angular/core';
import { MenuDemandeService } from './MenuDemande.service';
import { AuthenticationService } from '../Authentication/authentication.service';
import { DetailDemande } from 'src/app/models/DetailDemande';
import { Direction } from 'src/app/models/Direction';
import * as XLSX from 'xlsx';
import { DonneeExcel } from 'src/app/models/DonneExcel';
import { UtilitaireService } from 'src/app/service/utilitaire.service';
import { SessionCd } from 'src/app/models/SessionCd';
import { Brouillon } from 'src/app/models/Brouillon';
import { Demande } from 'src/app/models/Demande';
import { Titre } from 'src/app/models/TitreDepense';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-menu-demande',
  templateUrl: './MenuDemande.component.html',
  styleUrls: ['./MenuDemande.component.scss'],
})
export class MenuDemandeComponent implements OnInit {
  currentPage: number = 1; // Initialisation de la page courante
 
  previousDisabled : boolean = (this.currentPage = 1)? true : false ;

  itemsPerPage: number = 10; // Nombre d'éléments par page
  totalItems: number = 100; // Total d'éléments
  totalPages!: number ; // Calculé dynamiquement



  role: string | null = '';
  isUp=false;
  token: string | null = '';
  DetailDemande: DetailDemande[] = [];DetailDemandesanstitre: DetailDemande[] = [];
  brouillon: Brouillon[]=[];
  AttenteSession: DetailDemande[]=[];
  nomDirection: string | null = '';
  DonneExcels: DonneeExcel[] = [];
  listesessionActive=false;
  buttonTextColor = 'black';idsupprimer='';
  brouilloncliqueActive=false;Activedemande=false;Activedemandeclique=false;isbrouillon=false;brouillonActive=false;
  //CREATION SESSION
  direction = new Direction();
  DetailDemandeById = new DetailDemande();
  demandemodier = {
    estRegularisation: false,
    periode:'',
    idRubrique: '',
    sousRubrique: '',
    motif: '',
    devise: '',
    typeDevise: '',
    comsPrescripteur: '',
    idDirection: '',
    idTitreDepense: '',
    reference: '',
    titre: '',
    montantHt: 0,
    montantMga:'',
    idSession:'',
    fournisseur: '',
    idPeriode: '',
    validationPrescripteur: false,
    validationAchat: false,
    validationCdg: false,
    typeReference: '',
    estRefuseCdg:false,
    estRefuseAchat:false,
    estSoumis:false,
    depense:'',
    dateCreation:'',
    identifiant:'',
    dateSoumission:'',nomReference:''
  };
  demande=new DetailDemande();
  titredepense = {
    designation: '',
    idDirection : '',
    idSession : ''
  };
  titre = new Titre();datePipe:DatePipe;
  groupedDetailDemandes: { [titre: string]: { [iddirection: string]: DetailDemande[] } } = {};
  totalMontantsHT : {[titre:string]:number;}={};
  demandes = new Demande();
session=new SessionCd();
  idsession:string ='';
  text: string = '';
    constructor(
    private MenuDemandeService: MenuDemandeService,
    private AuthenticationService: AuthenticationService,
    private utilitaire:UtilitaireService,private decimalPipe: DecimalPipe
  ) { 
    this.datePipe= new DatePipe('en-US');
    this.token = sessionStorage.getItem('token');
    if(this.token !== null )
      {
  
        this.AuthenticationService.getUserInformation()
        .subscribe(response => {
          console.log("TRAITEMENT USER INFO");
          //console.log(response);
          console.log(response['groups']);      //tableau
          const tableRole = response['groups'];
      
      //chercher ROLE 
          this.role = this.AuthenticationService.getRole(tableRole);
     if(this.role==='PRS'){
      this.isbrouillon=true;this.brouillonActive=true;
     }else{
      this.Activedemande=true;this.Activedemandeclique=true;
     }
      //chercher DIRECTION (groups) a partir du token
          const tableGROUPE = response['direction'];
  
          this.nomDirection = this.AuthenticationService.getDirection( response['direction']) ;
            if(this.nomDirection !== null)
            { 

              this.AuthenticationService.getDirectionByName(this.nomDirection).subscribe(response =>{
                 this.direction = response
                  this.direction.id = response.id;
                    
                  


                        //RECUPERATION id session


                          this.utilitaire.getSessionByDirection(this.direction.id?.toString() ??'' ).subscribe((data) => {
                                    if(data !== null)
                                    {
                                          console.log("------------ session ------------");
                                          console.log(data);
                                          
                                          this.session = data;
                                          this.idsession = data.id?.toString() ?? '';
                                        console.log(this.idsession,'sessionnnnnnnnnnnnnnnnnn');
                                      }
                            
                                            //RECUPERATION active
                                            this.MenuDemandeService.search(this.direction.id?.toString() ??'',this.idsession.toString() ) .subscribe((donnees) => {
                                              this.DetailDemande = donnees;
                                              console.log(this.DetailDemande,"io data");

                                            //const listeOriginale= DetailDemande ;
                                            // donnees.forEach(demande => {
                                            //   const titre = demande.titre?? '';
                                            //   const iddirection = demande.iddirection?? '';
                                            
                                            //   // Si le titre n'est pas encore présent dans l'objet, initialisez-le
                                            //   if (!(titre in this.groupedDetailDemandes)) {
                                            //     this.groupedDetailDemandes[titre] = {};
                                            //   }
                                            
                                            //   // Vérifiez si le tableau pour cette iddirection existe déjà
                                            //   if (!this.groupedDetailDemandes[titre][iddirection]) {
                                            //     // Si non, initialisez-le avec un tableau vide
                                            //     this.groupedDetailDemandes[titre][iddirection] = [];
                                            //   }
                                            
                                            //   // Ajoutez la demande au tableau correspondant
                                            //   this.groupedDetailDemandes[titre][iddirection].push(demande);
                                            // }); 
                                            


                                            // Supposons que groupedDetailDemandes est déjà défini comme un objet


                                            // console.log(this.groupedDetailDemandes,'test groupe detaildemande');
                                          ///addition
                                          donnees.forEach(demande => {
                                             const titre = demande.titre?? '';
                                             const iddirection = demande.iddirection?? '';
                                          
                                            // Si le titre n'est pas encore présent dans l'objet, initialisez-le
                                            if (!(titre in this.groupedDetailDemandes)) {
                                              this.groupedDetailDemandes[titre] = {};
                                            }
                                          
                                            // Vérifiez si le tableau pour cette iddirection existe déjà
                                            if (!this.groupedDetailDemandes[titre][iddirection]) {
                                              // Si non, initialisez-le avec un tableau vide
                                              this.groupedDetailDemandes[titre][iddirection] = [];
                                            }
                                          
                                            // Ajoutez la demande au tableau correspondant
                                            this.groupedDetailDemandes[titre][iddirection].push(demande);
                                          console.log('chaque montant ',demande.montantht);
                                          console.log('somme montantht',demande.montantht);
                                          
                                            // Calculez le total des montants HT pour ce groupe
                                            // const total = this.groupedDetailDemandes[titre][iddirection].reduce((acc, demande) => acc + (demande.montantht || 0), 0);
                                            const total = this.groupedDetailDemandes[titre][iddirection].reduce((acc, demande) => acc + Number(demande.montantht) || 0, 0);


                                            // Stockez le total dans l'objet totalMontantsHT
                                            this.totalMontantsHT[titre] = total;
                                            
                                          });
                                           console.log(this.groupedDetailDemandes, 'test groupe detaildemande');
                                          






                                          });    
      
                                            //RECUPERATION brouillon
                                            this.loadBrouillon(this.direction.id?.toString() ??'',this.idsession.toString() ,this.currentPage , this.itemsPerPage);
                                            

                                            this.MenuDemandeService.getAttenteSession(this.direction.id?.toString() ??'').subscribe((datas) => {
                                              this.AttenteSession = datas;
                                              console.log(this.AttenteSession,"io   AttenteSession");
                                              
                                            });

                      
                          });
                   
                  console.log('blaoohi',response);
                });
            }
  
      //chercher NOM
          if(response['given_name']!==null)
          {
            const tableNOM = response['given_name'];
            console.log('NOM!: '+tableNOM);
    
        //Metraka nom anaty session
            sessionStorage.removeItem('nom');
            sessionStorage.setItem("nom",tableNOM); 
          }
    
      });
  
  
      } 
    //getbytitre
  }


  loadBrouillon(idDirection : string, idSession : string , page : number , size :number)  :void
  {
    this.MenuDemandeService.searchbrouillon(idDirection?.toString() ??'',idSession.toString() ,page , size) .subscribe((datas) => {
      
      // const totalPagesHeader = datas.headers.get('X-Pages-Total');
      // console.log("------------------------------------------------"+totalPagesHeader);
      
      this.brouillon = datas;
      console.log(this.brouillon,"io brouillon #############################");
      
    });
  }

  goToNextPageBrouillon(): void {

      this.currentPage++;
      this.loadBrouillon(this.direction.id?.toString() ??'',this.idsession.toString() ,this.currentPage , this.itemsPerPage);
    

    }
    goToPreviousBrouillon(): void {
        this.currentPage--;
        this.loadBrouillon(this.direction.id?.toString() ??'',this.idsession.toString() ,this.currentPage , this.itemsPerPage);    
    }

  ngOnInit(): void {
    

    //RECUPERATION brouillon
    // this.MenuDemandeService.getBrouillon().subscribe((DetailDemande) => {
    //   this.DetailDemande = DetailDemande;
    //   console.log(DetailDemande);
      
    // });
   


    // //RECUPERATION active
    // this.MenuDemandeService.getdmdactive().subscribe(Response => {
    //   this.actives = Response;
    // });

    
  }
//exporter excel
exportToExcel(): void {
  //aectation données eccdel

  for (const detail of this.DetailDemande) {
    this.DonneExcels.push({
      Typereference: detail.typereference,
      Motif: detail.motif,
      Fournisseur: detail.fournisseur,
      Devise: detail.devise,
      MontantHt: detail.montantht?.toString(),
      MontantMga: detail.montantMga,
      Commentaireprescripteur: detail.comsprescripteur,
      Periode: detail.periode,
      Regularisation: detail.estregularisation,
      commentaireCdg: detail.comsCdg,
      commentaireAchat: detail.comsAchat,
      Decision: detail.etatFinal,
      commentaireCd: detail.comsCd,
    });

  }

  this.MenuDemandeService.exportToExcel(this.DonneExcels, 'MyData.xlsx');
}
brouillonclique(){
  this.isbrouillon=true;
  this.brouillonActive =true; 
  this.listesessionActive=false;
  this.brouilloncliqueActive=false;
  this.Activedemande=false;
  this.Activedemandeclique=false;
}
  brouilloncliqueactive(){
    this.brouilloncliqueActive=true;
    this.isbrouillon=false;
    this.listesessionActive=true;
    this.brouillonActive =false; 
    this.Activedemande=false;
    this.Activedemandeclique=false;
  }
  brouilloncliqueactivedemande(){
    this.Activedemande=true;
    this.brouilloncliqueActive=false;
    this.isbrouillon=false;
    this.listesessionActive=false;
    this.Activedemandeclique=true;
    this.brouillonActive =false; 
  }

  annulerdemande(){    
    this.GetDataByid();
    console.log(this.demande,'itodemande ');
    // this.demande.validationPrescripteur=false;
    //   this.demande.estSoumis=false;
     this.utilitaire.update(parseInt(this.idsupprimer), this.demande).subscribe((Response) => {
       console.log(Response,'modication ooooooooo');
       this.AttenteSession=Response;
      });
  }
  GetDataByid(){
    this.MenuDemandeService.getAttteneSessionById(parseInt(this.idsupprimer)).subscribe((response)=>
      {
        this.demandes=response;
        console.log(response,'itooooooo demande par id');
        
    //  this.demande.estRegularisation = Boolean(this.demandes.estregularisation);
    //  this.demande.idRubrique=this.demandes.idrubrique?.toString() ?? '';
    //  this.demande.sousRubrique=this.demandes.sousrubrique?.toString() ?? '';
    //  this.demande.motif=this.demandes.motif?.toString() ?? '';
    //  this.demande.devise=this.demandes.devise?.toString() ?? '';
    //  this.demande.comsPrescripteur=this.demandes.comsprescripteur?.toString() ?? '';
    //  this.demande.idDirection=this.demandes.iddirection?.toString() ?? '';
    //  this.demande.idTitreDepense=this.demandes.idtitre?.toString() ?? '';
    //  this.demande.nomReference=this.demandes.reference?.toString() ?? '';
    //  this.demande.fournisseur=this.demandes.fournisseur?.toString() ?? '';
    //  this.demande.montantHt=this.demandes.montantht?.toString() ?? '';
    //  this.demande.idPeriode=this.demandes.idperiode?.toString() ?? '';
    //  this.demande.typeReference=this.demandes.typereference?.toString() ?? '';
    //  this.demande.validationPrescripteur=Boolean(this.demandes.validationprescripteur);
    //  this.demande.estSoumis=Boolean(this.demandes.estSoumis);
    //  this.demande.depense=this.demandes.depense?.toString() ?? '';
    //  this.demande.dateCreation=this.demandes.dateCreation?.toString() ?? '';
    //  this.demande.identifiant=this.demandes.identifiant?.toString()??'';
      });
      console.log(this.demande,'detailpar demande');
  }
  btnplus(){
  
    this.isUp=!this.isUp;
  }
  //getid demande
  getid(id:any){
      this.idsupprimer= id;
      console.log(id,'id de cette demande');
      
  }
   //supprimer demande
   supprimationDemande(){    
    // console.log(id,'diddemande');

      this.MenuDemandeService.supprimerDemande(parseInt(this.idsupprimer))
      .subscribe((response)=>{},(error)=>{console.log(error);
      });
    }
    Soumission(){

    //recuperation par detail
    console.log('idddemandeeeeeee',this.idsupprimer);
    
    this.utilitaire.getDetailDemandebyId(parseInt(this.idsupprimer)).subscribe((response) => {
      this.DetailDemandeById = response;
      this.demande=this.DetailDemandeById;
    console.log('detaildemande ito veriena/////////',this.demande);
      
    if(this.idsession===''){
      console.log('vide session');
    }else{
      console.log(this.idsession,'+///////////sessionnnn///////////////');
       this.demande.idSession=this.idsession;
       let dateValue = this.getormatdate();

        if (typeof dateValue === 'string') {
            // Convertir la chaîne en Date
            this.demande.dateSoumission = new Date(dateValue);
        } else if (dateValue === null || dateValue === undefined) {
            // Gérer les cas où la valeur est null ou undefined
            this.demande.dateSoumission = undefined; // Ou assignez explicitement à null si c'est ce que vous souhaitez
        } else {
            throw new Error('Type inattendu retourné par getormatdate');
        }
        this.demande.idtitre=this.DetailDemandeById.idtitre;
       this.demande.validationprescripteur = true;
        this.demande.estsoumis=false;
       console.log(this.demande,'demande vaovao');
       
       this.updatetitre(this.demande.idtitre);
       console.log(this.demande,'soumission demande');
      //  this.update(this.demande);
      console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
      console.log(this.demande.id);
      

      this.soumettreDemande(this.demande.id?.toString() ?? '');
      this.notifierAchCdgSoumis();
      
       console.log(this.demande,'e mis datepipe');
      }

    });
    window.location.reload();
    
    }
    getormatdate(){
      const date= new Date();
      return this.datePipe.transform(date,'yyyy-MM-dd');  
    }
//modication prescripteur
update(demande:any): void {
  console.log('moulle');
  console.log(this.demande.idSession,'idsesssinkk');
  
  console.log(this.demande,'demande a updater');
  this.demandemodier.estRegularisation=demande.estregularisation;
  this.demandemodier.comsPrescripteur=demande.comsprescripteur;
  this.demandemodier.dateSoumission=demande.dateSoumission;
  this.demandemodier.idDirection=demande.iddirection;
  this.demandemodier.idPeriode=demande.idperiode;
  this.demandemodier.dateCreation=demande.dateCreation;
  this.demandemodier.devise=demande.devise;
  this.demandemodier.depense=demande.depense;
  this.demandemodier.fournisseur=demande.fournisseur;
  this.demandemodier.idSession=demande.idSession;
  this.demandemodier.idRubrique=demande.idrubrique;
  this.demandemodier.motif=demande.motif;
  this.demandemodier.identifiant=demande.identifiant;
  this.demandemodier.montantHt=demande.montantht;
  this.demandemodier.reference=demande.reference;
  this.demandemodier.idTitreDepense=demande.idtitre;
  this.demandemodier.montantMga=demande.montantMga;
  this.demandemodier.validationPrescripteur=true;
  this.demandemodier.sousRubrique=demande.sousrubrique;
  this.demandemodier.nomReference=demande.nomReference;
  this.demandemodier.typeReference=demande.typereference;
  this.demandemodier.typeDevise=demande.devise;
  console.log(this.demandemodier,'ito izy restultat');
  
  this.MenuDemandeService.update(parseInt(this.idsupprimer),this.demandemodier).subscribe((Response) => {
    console.log(Response,'vide ve');
  });
  
   window.location.reload();
}

    //modication prescripteur
  updatetitre(idtitre:any): void { 
    // console.log(this.demande.idTitreDepense,'titredepense');
    console.log(this.idsession,'idsessionjjjjjj');
    console.log('////////titre update');
    
    //recuperation titre by id
    this.MenuDemandeService.gettitreById(parseInt(idtitre)).subscribe((data) => {
      this.titre = data;
    console.log(this.titre,'ito ');
    this.titredepense.idDirection=this.titre.idDirection?.toString() ?? '';;
    this.titredepense.designation=this.titre.designation?.toString() ?? '';;
    this.titredepense.idSession = this.idsession ??"";
    console.log(this.titredepense,'juu');
            ///modication titre
            this.MenuDemandeService.updatetitredepense(parseInt(idtitre), this.titredepense).subscribe((Response) => {
              console.log(Response);
            });
  });
    
    
   }
   notifierAchCdgSoumis(){
    this.MenuDemandeService.notifSoumission();
  }

   soumettreDemande (id : string){
    console.log("#############################################");
    
    this.MenuDemandeService.soumettreDemande(id)
    .subscribe(
      (response)=>{console.log(response);

    },(error)=>{console.error(error);}
    
    );
   }


   normaliserTitre(titre: string): string {
    return titre.replace(/\s+/g, ''); // Remplace tous les espaces par des chaînes vides
  }
   formatNumber(value?: any): string | null {
    if (value === null || value === undefined) {
        return null; // Retourne null si value est null ou undefined
    }
    return value?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
}

//    formatNumber(value?: string): string | null {
//     if (value === null || value === undefined) {
//         return null; // Retourne null si value est null ou undefined
//     }
//     return value?.toString().replace(/\.\d+/g, " ");
// }
som(num:any){
  var som;
 return som=+parseInt(num);
}
}
