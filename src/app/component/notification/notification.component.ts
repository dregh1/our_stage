import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
nomrefence=false;
constructor() { }

  ngOnInit(): void {
  }
  refencedemande(){
    this.nomrefence=true;
}
}
