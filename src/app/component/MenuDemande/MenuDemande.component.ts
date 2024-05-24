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
@Component({
  selector: 'app-menu-demande',
  templateUrl: './MenuDemande.component.html',
  styleUrls: ['./MenuDemande.component.scss'],
})
export class MenuDemandeComponent implements OnInit {
  role: string | null = '';
  
  token: string | null = '';
  DetailDemande: DetailDemande[] = [];
  brouillon: Brouillon[]=[];
  AttenteSession: DetailDemande[]=[];
  nomDirection: string | null = '';
  DonneExcels: DonneeExcel[] = [];
  isbrouillon=true;listesessionActive=false;
  brouillonActive=true;buttonTextColor = 'black';
  brouilloncliqueActive=false;
  //CREATION SESSION
  direction = new Direction();
  demande = {
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
    nomReference: '',
    titre: '',
    montantHt: '',
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
    identifiant:''
  };
  groupedDetailDemandes: { [titre: string]: DetailDemande[] } = {};
  demandes = new Demande();
session=new SessionCd();
  idsession:string ='';
  text: string = '';
    constructor(
    private MenuDemandeService: MenuDemandeService,
    private AuthenticationService: AuthenticationService,
    private utilitaire:UtilitaireService
  ) {
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

                                              ///aichage groupé
                                              this.groupedDetailDemandes = donnees.reduce((acc, item) => {
                                                if (item.titre) {
                                                  if (!acc[item.titre]) {
                                                    acc[item.titre] = [];
                                                  }
                                                  acc[item.titre].push(item);
                                                }
                                                return acc;
                                              }, {} as { [titre: string]: DetailDemande[] });
                                              console.log(this.groupedDetailDemandes,'laichage gorupé');
                                              
                                              
                                            });
      
      
                                            //RECUPERATION brouillon
                                            this.MenuDemandeService.searchbrouillon(this.direction.id?.toString() ??'',this.idsession.toString() ) .subscribe((datas) => {
                                              this.brouillon = datas;
                                              console.log(this.brouillon,"io brouillon");
                                              
                                            });
                                            //RECUPERATION ATTENTE sESSION
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
      MontantHt: detail.montantht,
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
  }
  brouilloncliqueactive(){
    this.brouilloncliqueActive=true;
    this.isbrouillon=false;
    this.listesessionActive=true;
    this.brouillonActive =false; 
  }
  annulerdemande(id:any){
    this.MenuDemandeService.getAttteneSessionById(id).subscribe((response)=>
    {
      this.demandes=response;
      console.log(response,'itooooooo demande par id');
      
   this.demande.estRegularisation = Boolean(this.demandes.estregularisation);
   this.demande.idRubrique=this.demandes.idrubrique?.toString() ?? '';
   this.demande.sousRubrique=this.demandes.sousrubrique?.toString() ?? '';
   this.demande.motif=this.demandes.motif?.toString() ?? '';
   this.demande.typeDevise=this.demandes.devise?.toString() ?? '';
   this.demande.comsPrescripteur=this.demandes.comsprescripteur?.toString() ?? '';
   this.demande.idDirection=this.demandes.iddirection?.toString() ?? '';
   this.demande.idTitreDepense=this.demandes.idtitre?.toString() ?? '';
   this.demande.nomReference=this.demandes.reference?.toString() ?? '';
   this.demande.fournisseur=this.demandes.fournisseur?.toString() ?? '';
   this.demande.montantHt=this.demandes.montantht?.toString() ?? '';
   this.demande.idPeriode=this.demandes.idperiode?.toString() ?? '';
   this.demande.typeReference=this.demandes.typereference?.toString() ?? '';
   this.demande.validationPrescripteur=Boolean(this.demandes.validationprescripteur);
   this.demande.estSoumis=Boolean(this.demandes.estSoumis);
   this.demande.depense=this.demandes.depense?.toString() ?? '';
   this.demande.dateCreation=this.demandes.dateCreation?.toString() ?? '';
   this.demande.identifiant=this.demandes.identifiant?.toString()??'';
   console.log(this.demande,'itodemande ');
   this.demande.validationPrescripteur=false;
     this.demande.estSoumis=false;
    this.utilitaire.update(id, this.demande).subscribe((Response) => {
      console.log(Response,'modication ooooooooo');
      this.AttenteSession=Response;
     });
    });
    
 
   
  }
}
