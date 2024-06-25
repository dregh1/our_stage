import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Authentication/authentication.service';
import { Direction } from 'src/app/models/Direction';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  role: string | null = '';
  token: string | null = '';
  nom: string | null = '';
  acceuil=true;consultation=false;creationsession=false;admin=false;validation=false;
  nomDirection: string | null = '';direction = new Direction();
  constructor(private AuthenticationService: AuthenticationService,  private router: Router) {
    this.token = sessionStorage.getItem("token");
    // this.idDirection = authServ.getIdDirectionByName();
   // this.direction.id=-1;
  //RECUPERATION IdDirection                
    if(this.token !== null )
    {
      /*  ajout nom direction dans la sessionStorage */
        this.AuthenticationService.getUserInformation().subscribe(response =>
          {
              /* recuperation de l'id ROLE */
              
              this.role = AuthenticationService.getRole(response['groups'])  ;
              this.nom =  response['given_name'];
              console.log("-----------------");
              // console.log(response);
              
              
          });


    
    }
  }


  ngOnInit(): void {}
  acceuilbtn(){
    this.acceuil=true;
    this.consultation=false;
    this.creationsession=false;
    this.validation=false;
    
    this.admin=false;
   this.router.navigate(['/main/MenuDemande']);
  }
  consultationbtn(){
    this.acceuil=false;
    this.consultation=true;
    this.creationsession=false;
    this.admin=false;
    this.validation=false;
    
    this.router.navigate(['/main/consultation']);
  }
  creationsessionbtn(){
    this.acceuil=false;
    this.consultation=false;
    this.creationsession=true;
    this.admin=false;
    this.validation=false;
    
    this.router.navigate(['/main/creationsession']);
  }
  adminbtn(){
    this.admin=true;
    this.acceuil=false;
    this.consultation=false;
    this.creationsession=false;
    this.validation=false;
    this.router.navigate(['/main/superAdmin']);
  }
  validationbtn(){
    this.validation=true;
    this.admin=false;
    this.acceuil=false;
    this.consultation=false;
    this.creationsession=false;
    
    this.router.navigate(['../validation']);
  }
}
