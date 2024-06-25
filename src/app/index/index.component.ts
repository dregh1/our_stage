import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators  }from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  heroForm = this.fb.group({
    name: ['', Validators.required],
    power: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log('okokokkooko');
    
    // Traiter le formulaire ici
  }
ngOnInit(): void {
    
}
}
