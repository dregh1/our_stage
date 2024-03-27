import { Component, OnInit, Renderer2, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { Personnel } from 'src/app/models/Personnel';
import { PersonnelService } from 'src/app/services/personnel.service';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-edit',
  templateUrl: './prescripteur.component.html',
  styleUrls: ['./prescripteur.component.scss']
})
export class EditComponent {
  role: string = 'prescripteur';
  isUp1 = false; // Initial state for first button
  isUp2 = false; // Initial state for second button
  isUp3 = false;
  toggleUp() {
    this.isUp1 = !this.isUp1;
  }

  toggleDown() {
    this.isUp2 = !this.isUp2;
  }
  constructor() {
    enum Role {
      Prescripteur,
      Achat,
      Admin,
    }
  }

  isUp = true; // Initial state

  toggleIcon() {
    this.isUp3 = !this.isUp3;
  }

}