import { Component, OnInit, Renderer2, ElementRef, AfterViewInit ,ViewChild } from '@angular/core';
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
  
  

  constructor() {}

  isUp = true; // Initial state

  toggleIcon() {
    this.isUp = !this.isUp;
  }

}