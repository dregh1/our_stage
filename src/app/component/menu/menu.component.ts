import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  heure:Date=new Date();role: string = 'prescripteur';
  heureDepart:Date=new Date();
  constructor(){
    this.heureDepart.setHours(0,30, 3);
  }

  ngOnInit(): void {
      setInterval(()=>{
        this.decrementeHeure();
        this.updateColor();
      },1000);
}
decrementeHeure(){
  this.heureDepart = new Date(this.heureDepart.getTime()-1000);
}
updateColor(){
  const timedi=this.heureDepart.getTime() - this.heure.getTime();
  const trente=30 * 60 * 1000;
  if(timedi<=trente){
   return 'red';
  }
  return 'black';
}
}
