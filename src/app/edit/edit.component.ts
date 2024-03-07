import { Component, OnInit } from '@angular/core';
import { Personnel } from 'src/app/models/Personnel';
import { PersonnelService } from 'src/app/services/personnel.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
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
 
  updateRecord(id: any, newData: any): void {
    this.personnelService.update(id, newData).subscribe(response => {
      console.log(response);
      window.location.reload();
    });
  }
}
