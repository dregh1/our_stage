import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthenticationComponent } from './component/authentication copy/authentication.component';
import { ConsultationComponent } from './component/consultation/consultation.component';
import { NotificationComponent } from './component/notification/notification.component';
import { MainComponent } from './component/main/main.component';
import { CreationPrescripteurComponent } from './component/creation-prescripteur/creation-prescripteur.component';
import { CreationSession1Component } from './component/creation-session1/creation-session1.component';
import { HeaderComponent } from './component/header/header.component';
import { TestComponent } from './component/DetailParDemande/DetailParDemande.component';
import { MenuDemandeComponent } from './component/MenuDemande/menu-demande.component';
import { ValidationComponent } from './component/validation/validation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthenticationComponent,
    ValidationComponent,
    ConsultationComponent,
    NotificationComponent,
    MainComponent,
    CreationPrescripteurComponent,
    CreationSession1Component,
    TestComponent,
    MenuDemandeComponent
  //  DetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
