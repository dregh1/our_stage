import { Component, OnInit, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { Personnel } from 'src/app/models/Personnel';
import { PersonnelService } from 'src/app/services/personnel.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit, AfterViewInit {
  personnels: Personnel[] = [];
  showmesg = false;
  personnel = {
    nom: '',
    prenom: '',
    age: ''
  };
 



  constructor(private personnelService: PersonnelService, private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.personnelService.get().subscribe(data => {
      this.personnels = data;
    });
  }

  onSubmit(): void {
    this.personnelService.post(this.personnel).subscribe(response => {
      console.log(response);
      this.showmesg = true;

      setTimeout(() => {
        this.showmesg = false;
      }, 2000);
      window.location.reload();
    });
  }

  deletePersonnel(id: number): void {
    this.personnelService.delete(id).subscribe(response => {
      console.log(response);
      window.location.reload();
    });
  }

  updateRecord(id: number, newData: any): void {
    this.personnelService.update(id, newData).subscribe(response => {
      console.log(response);
      window.location.reload();
    });
  }

  ngAfterViewInit() {
    const signup = this.el.nativeElement.querySelector('.signup');
    const login = this.el.nativeElement.querySelector('.login');
    const slider = this.el.nativeElement.querySelector('.slider');
    const formSection = this.el.nativeElement.querySelector('.form-section');

    signup.addEventListener('click', () => {
      this.renderer.addClass(slider, 'moveslider');
      this.renderer.addClass(formSection, 'form-section-move');
    });

    login.addEventListener('click', () => {
      this.renderer.removeClass(slider, 'moveslider');
      this.renderer.removeClass(formSection, 'form-section-move');
    });
  }
}

