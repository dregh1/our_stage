import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {
  isUp1 = false; // Initial state for first button

  toggleUp() {
    this.isUp1 = !this.isUp1;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
