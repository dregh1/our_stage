import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from './super-admin.service';
import { User } from 'src/app/models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitaireService } from 'src/app/service/utilitaire.service';
import { Role } from 'src/app/models/Role';
import { NEVER, never } from 'rxjs';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit {
  
  listUserExistant : User[] =[] ;     //list users existant chez ldap via keycloak 

  nomAchercher : string = '';

  resultatRecherche : User[] = [];


  roleList : Role [] = [];
  roleToAssign = "";
  // role


  rola : string = 'ACH';
  constructor(private superAdm : SuperAdminService, private http: HttpClient , private utilitaire : UtilitaireService) { }

  ngOnInit(): void {
    this.superAdm.getTokenAdmin();
    this.rechercherAll();
    this.getAllRole();
    
  }

  rechercherAll()  // recuperer les users 
  {
    // this.superAdm.getTokenAdmin();
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

    // exp regulier ignorant les majuscul
    const regex = new RegExp(this.nomAchercher.toLowerCase(),'i');

    this.resultatRecherche = this.listUserExistant.filter(user =>
          regex.test( user.firstName.toLowerCase() ) ||
          regex.test( user.lastName?.toLowerCase() ) 
      );

   console.log(this.resultatRecherche);
    
  }


  //ASSIGNER ROLE
  // assigneRole ()
  // {
  //   var token = sessionStorage.getItem('tokenAdmin');
  //   var data = JSON.stringify([
  //     {
  //       "id": "6a68b6d7-448c-423d-801d-75f30ffc9a67",
  //       "name": "ACH"
  //     }
  //   ]);
    
  //   var xhr = new XMLHttpRequest();
  //   xhr.withCredentials = true;
    
  //   xhr.addEventListener("readystatechange", function() {
  //     if(this.readyState === 4) {
  //       console.log(this.responseText);
  //     }
  //   });
    
  //   xhr.open("POST", "http://localhost:8083/admin/realms/oma/users/13634f98-71b2-4122-b530-b258629fa7f5/role-mappings/realm");
  //   xhr.setRequestHeader("Content-Type", "application/json");
  //   xhr.setRequestHeader("Authorization", "Bearer "+token);
    
  //   xhr.send(data);
  // }


  iduser : string ="13634f98-71b2-4122-b530-b258629fa7f5";

  assigneRole() {

    const token = sessionStorage.getItem('tokenAdmin');
    let roleTableToSend : [] = [];


    console.log("*-*-**-*-*-*-*-*-*");
    console.log(this.roleToAssign);
    
    let roleToSend = this.getRoleById(this.roleToAssign);

      // if(roleToSend ) 
      
      // roleTableToSend.push(roleToSend);
    
    // const data = [
    //   {
    //     "id": "6a68b6d7-448c-423d-801d-75f30ffc9a67",
    //     "name": "ACH"
    //   }
    // ];

    // // Création d'un objet HttpHeaders pour définir les en-têtes nécessaires
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // });

    // // Utilisation de HttpClient pour envoyer la requête POSt
    // this.http.post('http://localhost:8083/admin/realms/oma/users/'+this.iduser+'/role-mappings/realm', data, { headers })
    //  .subscribe(response => {
    //     console.log(response);
    //   }, error => {
    //     console.error(error);
    //   });
  }

  getIdUser(id : string)
  {
    this.iduser=id;

    console.log("------A------");
    console.log(this.iduser);
    
  }

  //teste envoye mail
  envoyerMail(){
    this.utilitaire.sendMail();
  }


  // fonction get all roles
  getAllRole()
  {
    this.superAdm.getAllRoles().subscribe(
      (response)=>{  this.roleList = response ; console.log(response ); console.log("/////////////////////////" );
      },
      (error)=>{})
  }



  getRoleById( id : string ) : Role | null
  {
    
    for(let item of this.roleList  )
    {
        if(item.id === id)
        return item
    }
    
    return null;

  }
}
