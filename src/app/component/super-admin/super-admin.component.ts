import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from './super-admin.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit {
  
  listUserExistant : User[] =[] ;     //list users existant chez ldap via keycloak 

  nomAchercher : string = '';

  resultatRecherche : User[] = [];

  constructor(private superAdm : SuperAdminService) { }

  ngOnInit(): void {
    this.rechercherAll()  ;
  }

  rechercherAll()  // recuperer les users 
  {
     this.superAdm.getTokenAdmin();
    this.superAdm.getAllUser().subscribe(
      (data)=>
          {

            const users : User[] =[];
            for(let i = 0 ; i<data.length ; i++)
            { 
              const user = new User();
              user.id = data[i].id;
              user.lastName = data[i].lastName;
              user.firstName = data[i].firstName;
              
              users.push(user);
            }
            this.listUserExistant = users;
            console.log(users);
            
          },
      (error)=>{console.error(error)}
    
    );
  }

  rechercheUser()
  {
    const tableUser : User[] =[];
    if(this.nomAchercher!=''){
    // exp regulier ignorant les majuscul
    const regex = new RegExp(this.nomAchercher.toLowerCase(),'i');

    this.listUserExistant = this.listUserExistant.filter(user =>
          regex.test( user.firstName.toLowerCase() ) ||
          regex.test( user.lastName.toLowerCase() ) 
      );

//    console.log(resultat);
    
  }else{
    this.rechercherAll();
  }
}
}
