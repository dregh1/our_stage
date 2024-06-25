import { Component, OnInit } from '@angular/core';
import {
  AfterContentInit,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
  SimpleChanges,
  EventEmitter
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-bpmnprocess',
  templateUrl: './bpmnprocess.component.html',
  styleUrls: ['./bpmnprocess.component.scss']
})
export class BpmnprocessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
