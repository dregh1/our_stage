import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Authentication/authentication.service';
import { Direction } from 'src/app/models/Direction';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  role: string | null = '';
  token: string | null = '';
  nom: string | null = '';
  nomDirection: string | null = '';direction = new Direction();
  constructor(private AuthenticationService: AuthenticationService) {
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
}
