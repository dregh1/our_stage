import { Component, OnInit, Renderer2, ElementRef, AfterViewInit ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Personnel } from 'src/app/models/Personnel';
import { PersonnelService } from 'src/app/services/personnel.service';
import { LogService } from '../../services/log.service';


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit, AfterViewInit {
  errorStatus = false;
  errorMessage ='' ;

  personnels: Personnel[] = []; 
  showPassword=false;
  showmesg = false; 

  personnel = {
    id: '' ,
    nom: '',
    prenom: '',
    age: ''
  };
  logindata = {
   
    username: '',
    password: '',
    
  }



  constructor(private logService: LogService, private router: Router ,private personnelService: PersonnelService, private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.personnelService.get().subscribe(data => {
      this.personnels = data;
    });
  }

// verifier login  //

verifierLogin(): void {

      
  // etape vers quarkus
  this.logService.post(this.logindata)
    .subscribe((response: any)  => {
      
      // Traitez la réponse du backend si nécessaire
      
      // condition si l'utisateur est autorisé 
      if (response.message === 'Authentification réussie') {
        // Rediriger l'utilisateur vers la page d'accueil
        this.router.navigate(['/home']);
    }else{
      // Afficher un message d'erreur à l'utilisateur
      console.log("DISO A");
      this.errorStatus = true;
      this.errorMessage = 'Identifiants incorrects';
  }


      console.log(response);
      
      this.showmesg=true;
      
      
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

  updateRecord(id: any, newData: any): void {
    this.personnelService.update(id, newData).subscribe(response => {
      console.log(response);
      window.location.reload();
    });
  }
  ///////////////////////////Animation slide///////////////////////////////////////
  ngAfterViewInit() {
    const signup = this.el.nativeElement.querySelector('.signup');
    const login = this.el.nativeElement.querySelector('.login');
    //const slider = this.el.nativeElement.querySelector('.slider');
    const formSection = this.el.nativeElement.querySelector('.form-section');

    signup.addEventListener('click', () => {
    //  this.renderer.addClass(slider, 'moveslider');
      this.renderer.addClass(formSection, 'form-section-move');
    });

    login.addEventListener('click', () => {
      //this.renderer.removeClass(slider, 'moveslider');
      this.renderer.removeClass(formSection, 'form-section-move');
    });
  }

}
