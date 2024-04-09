import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonnelService } from './services/personnel.service';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './component/creation_session copy/home.component';
import { LogComponent } from './component/log/log.component';
import { MenuComponent } from './component/menu/menu.component';
import { HeaderComponent } from './component/header/header.component';
import { EditComponent } from './component/prescripteur/prescripteur.component';
import { AuthenticationComponent } from './component/authentication copy/authentication.component';
import { TesteComponent } from './teste/teste.component';
import { ValidationComponent } from './component/validation/validation.component';
import { ConsultationComponent } from './component/consultation/consultation.component';
import { CreationPrescriComponent } from './component/creation-prescri/creation-prescri.component';
import { AffichagePrescriComponent } from './component/affichage-prescri/affichage-prescri.component';
import { NotificationComponent } from './component/notification/notification.component';
import { MainComponent } from './component/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogComponent,
    EditComponent,
    MenuComponent,
    HeaderComponent,
    AuthenticationComponent,
    TesteComponent,
    ValidationComponent,
    ConsultationComponent,
    CreationPrescriComponent,
    AffichagePrescriComponent,
    NotificationComponent,
    MainComponent
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
