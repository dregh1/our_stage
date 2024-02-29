import { Component, OnInit } from '@angular/core';
import { Personnel } from 'src/app/models/Personnel';
import { PersonnelService } from 'src/app/services/personnel.service';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {
  personnels: Personnel[]=[];
  showmesg=false;
  personnel= {
    nom: '',
    prenom: '',
    age: ''
  };
  // response : any;
  // personnel: any;

  constructor(private personnelService: PersonnelService){}
  
  ngOnInit(): void {
    // Mettez ici toute logique d'initialisation nécessaire pour votre page d'accueil
    this.personnelService.get().subscribe(data => {
      this.personnels = data;
    }); 

  }

  // post
  onSubmit(): void {
    this.personnelService.post(this.personnel)
      .subscribe(response  => {
        // Traitez la réponse du backend si nécessaire
        console.log(response);
        this.showmesg=true;
        
        setTimeout(() => {
          this.showmesg=false;
        }, 2000);
        window.location.reload();
      });
  }

  deletePersonnel(id: number): void {
    this.personnelService.delete(id)
      .subscribe(response => {
        // Traitez la réponse du backend si nécessaire
        console.log(response);
        // Actualisez les données ou effectuez d'autres actions après la suppression
        window.location.reload();
      });
    }
    updateRecord(id: number, newData: any): void {
      this.personnelService.update(id, newData)
        .subscribe(response => {
          // Traitez la réponse du backend si nécessaire
          console.log(response);
          window.location.reload();
          // Actualisez les données ou effectuez d'autres actions après la mise à jour
        });
    }

}
