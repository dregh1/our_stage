import { Component, OnInit } from '@angular/core';
import {
  HttpParams,
  HttpHeaders,
  HttpClient,
  HttpResponse,
} from '@angular/common/http';
import { CreationSession1Service } from './CreationSession.service';
import { DatePipe, NumberSymbol } from '@angular/common';
import { AuthenticationService } from '../Authentication/authentication.service';
import { Direction } from 'src/app/models/Direction';
import { SessionCd } from 'src/app/models/SessionCd';
@Component({
  selector: 'app-creation-session1',
  templateUrl: './CreationSession.component.html',
  styleUrls: ['./CreationSession.component.scss'],
})
export class CreationSession1Component implements OnInit {
  token: string | null;
  nomDirection: string | null = '';
  idDirection?: Number;
  //CREATION SESSION
  direction = new Direction();

  session = new SessionCd();
  datePipe:DatePipe;

  userName = '';

  showPassword = false;
  showmesg = false;errorMessage:string='';

  constructor(
    private CreationSession1Service: CreationSession1Service,
    // private personnelService: PersonnelService,
    private http: HttpClient,
    private authServ: AuthenticationService
  ) {
    ///initialisaaiton date
    this.datePipe= new DatePipe('en-US');
    this.token = sessionStorage.getItem("token");
    // this.idDirection = authServ.getIdDirectionByName();

  //RECUPERATION IdDirection                
    if(this.token !== null )
    {
    
    

        this.authServ.getUserInformation().subscribe(response=>{
          
          /* recuperation de l'id direction */
          this.nomDirection = this.authServ.getDirection(response['direction']);

          if(this.nomDirection !== null)
            {
              this.authServ.getDirectionByName(this.nomDirection).subscribe(response =>{
                 this.direction = response;
               
                 
                 this.idDirection = response.id;  
                });
            }
        });

      
        
       
    
    }
  }

  ngOnInit(): void {

  }
getormatdate(){
  const date= new Date();
  return this.datePipe.transform(date,'yyyy-MM-dd');  
}
  // submit bouton ouvrir session
  openSession() {
    // this.session.idDirection =  this.idDirection;


    
   
    
    //this.session.dateDebut=this.getormatdate()?.toString() ?? '';
    // console.log('SSESESSESESE' + this.session.idDirection);
    console.log(this.session);
    console.log(this.session.dateDebut,'date debut');
    
    // creation session
    
    this.CreationSession1Service.post(this.session)
    .subscribe(
      (response) => {
        
      this.errorMessage="session enregistré";
      console.log("session enregistré-----------------------------------------------");
      console.log(response);
      
      //window.location.reload();
    } 
  
  );
  }
  
}
