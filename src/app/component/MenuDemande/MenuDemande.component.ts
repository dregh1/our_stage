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
  nomDirection: string | null = '';
  //CREATION SESSION
  direction = new Direction();
  // brouillon={
  //   titre : '',
  //  montant_ht : '',
  //  is_regularisation : '',
  //   coms_prescripteur : '',
  //    periode : '',
  //   direction : '',
  //  devise : '',
  //   fournisseur :'',
  // }
session=new SessionCd();
  idsession:string ='';
  text: string = '';DonneExcels:DonneeExcel[]=[];
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
                  
                  //this.idsession = this.direction.id?.toString() ?? '';
                  
                  
                        
                    
                  
                        //RECUPERATION id session
                          this.utilitaire.getSessionByDirection(this.direction.id?.toString() ??'' ).subscribe((data) => {
                            console.log("------------ session ------------");
                            console.log(data);
                            
                                      if( data !== null)
                                      {
                                            this.session = data;
                                            this.idsession = data.id?.toString() ?? '';
                                            console.log('sessionnnnnnnnnnnnnnnnnn');
                            
                                            //RECUPERATION active
                                            this.MenuDemandeService.search(this.direction.id?.toString() ??'',this.idsession.toString() ) .subscribe((data) => {
                                              this.DetailDemande = data;
                                              console.log(this.DetailDemande,"io data");
                                              
                                            });


                                            //RECUPERATION brouillon
                                            this.MenuDemandeService.searchbrouillon(this.direction.id?.toString() ??'',this.idsession.toString() ) .subscribe((data) => {
                                              this.brouillon = data;
                                              console.log(this.brouillon,"io brouillon");
                                              
                                            });
                                      }
                                      
                      
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
  // for (const detail of this.DetailDemande) {
  //   this.DonneExcels.push({
  //     Typereference: detail.typereference,
  //     Motif: detail.motif,
  //     Fournisseur: detail.fournisseur,
  //     Devise: detail.devise,
  //     MontantHt: detail.montantht,
  //     Commentaireprescripteur: detail.comsprescripteur,
  //     Periode: detail.periode,
  //     Regularisation: detail.estregularisation,
  //     commentaireCdg: detail.comsCdg,
  //     commentaireAchat: detail.comsAchat,
  //     Decision: detail.etatFinal,
  //     commentaireCd: detail.comsCd,
  //     MontantMga: detail.montantMga,
  //   });
  // }
  this.MenuDemandeService.exportToExcel('montable', 'MyData.xlsx');
}
  // getIdOfDirection (nomDirection  : string )
  //     {
  //       const nomDirectionn  : string = "DTI";

  //       this.AuthenticationService.getDirectionByName(nomDirection)
  //               .subscribe(response => {
  //                               console.log( response);
  //                             }
  //                         );
  //       console.log(nomDirection);
  //     }
}
