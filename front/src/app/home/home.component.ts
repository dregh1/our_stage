import { Component, OnInit } from '@angular/core';
import { Personnel } from 'src/app/models/Personnel';
import { PersonnelService } from 'src/app/services/personnel.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  personnels: Personnel[] = []; 
  showPassword=false;
  showmesg = false; 

  personnel = {
    id: '' ,
    nom: '',
    prenom: '',
    age: ''
  };
 



  constructor(private personnelService: PersonnelService) {}
  ngOnInit(): void {
    this.personnelService.get().subscribe(data => {
      this.personnels = data;
    });
  }
  deletePersonnel(id: number): void {
    this.personnelService.delete(id).subscribe(response => {
      console.log(response);
      window.location.reload();
    });
  }

  updateRecord(id: any, newData: any): void {
    this.personnelService.update(id, newData).subscribe(response => {
      console.log(response);
      window.location.reload();
    });
  }
}
