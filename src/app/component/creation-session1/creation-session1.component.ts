import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpHeaders, HttpClient,HttpResponse } from '@angular/common/http';
import { CreationSession1Service } from './creation-session1.service';
import { NumberSymbol } from '@angular/common';
import { AuthenticationService } from '../authentication copy/authentication.service';
import { Direction } from 'src/app/models/Direction';
import { SessionCd } from 'src/app/models/SessionCd';
@Component({
  selector: 'app-creation-session1',
  templateUrl: './creation-session1.component.html',
  styleUrls: ['./creation-session1.component.scss']
})
export class CreationSession1Component implements OnInit {
  token : string | null ;
  nomDirection : string | null ='';
  idDirection? : Number ;
  //CREATION SESSION
  direction = new Direction();

  session = new SessionCd();
  formData ={
        ref : "",
          dateCloture : Date,
          idDirection : Number,
          tauxEur : Number,
          tauxUsd : Number,
          tauxGbp  : Number,
          tauxMga  : Number,
       }


  userName='';
  
  showPassword=false;
  showmesg = false; 
 

  constructor(
                private CreationSession1Service: CreationSession1Service,
               // private personnelService: PersonnelService,
                private http: HttpClient,
                private authServ : AuthenticationService
            )
  
              {
                this.token = sessionStorage.getItem("token");
                // this.idDirection = authServ.getIdDirectionByName();

              //RECUPERATION IdDirection                
                if(this.token !== null )
                {
                
                
                  /*  ajout nom direction dans la sessionStorage */
                    this.authServ.getUserInfo(this.token);

                  /* recuperation de l'id direction */
                    this.nomDirection = sessionStorage.getItem('direction');
                    
                    if(this.nomDirection !== null)
                    {
                      
                      this.authServ.getDirectionByName(this.nomDirection).subscribe(response =>{ this.direction = response})
                      this.session.idDirection = this.direction.id;                      
                    }
                
                }
              }
  
ngOnInit(): void {                
                

              }


  // submit bouton ouvrir session
  openSession(){

               
                  this.session.idDirection = this.direction.id;
                  
                  console.log("SSESESSESESE"+this.session.idDirection);
                  console.log(this.session);
                  
                  // creation session
                this.CreationSession1Service.post(this.session).subscribe
                (response => {
                  console.log(response);
                  window.location.reload();
                });
                
              }
}
