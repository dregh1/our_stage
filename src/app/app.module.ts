import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonnelService } from './services/personnel.service';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './component/menu/menu.component';
import { HeaderComponent } from './component/header/header.component';
import { AuthenticationComponent } from './component/authentication copy/authentication.component';
import { ValidationComponent } from './component/validation/validation.component';
import { ConsultationComponent } from './component/consultation/consultation.component';
import { AffichagePrescriComponent } from './component/affichage-prescri/affichage-prescri.component';
import { NotificationComponent } from './component/notification/notification.component';
import { MainComponent } from './component/main/main.component';
import { CreationPrescripteurComponent } from './component/creation-prescripteur/creation-prescripteur.component';
import { CreationSession1Component } from './component/creation-session1/creation-session1.component';
import { DetailDemandeComponent } from './component/detail-demande/detail-demande.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    AuthenticationComponent,
    ValidationComponent,
    ConsultationComponent,
    AffichagePrescriComponent,
    NotificationComponent,
    MainComponent,
    CreationPrescripteurComponent,
    CreationSession1Component,
    DetailDemandeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    PersonnelService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
