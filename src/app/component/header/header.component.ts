import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication copy/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  role : string | null='';
  token : string | null = '' ;
  nom : string | null = '' ;
  nomDirection : string | null = '' ;
  constructor(private autheticationServ:AuthenticationService) { 


    this.token = sessionStorage.getItem("token");
    if(this.token !== null )
    {
      this.autheticationServ.getUserInfo(this.token);
      this.role = sessionStorage.getItem("role");
      this.nom = sessionStorage.getItem('nom');
      this.nomDirection = sessionStorage.getItem('direction');
    }
    

                    
     
  }

  ngOnInit(): void {
  }

}
