import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthenticationComponent } from './component/Authentication/authentication.component';
import { ConsultationComponent } from './component/consultation/consultation.component';
import { NotificationComponent } from './component/notification/notification.component';
import { MainComponent } from './component/main/main.component';
import { CreationPrescripteurComponent } from './component/CreationPrescripteur/CreationPrescripteur.component';
import { CreationSession1Component } from './component/CreationSession/CreationSession.component';
import { HeaderComponent } from './component/header/header.component';
import { TestComponent } from './component/DetailParDemande/DetailParDemande.component';
import { MenuDemandeComponent } from './component/MenuDemande/MenuDemande.component';
import { ValidationComponent } from './component/validation/validation.component';
import { SuperAdminComponent } from './component/super-admin/super-admin.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ValidationComponent,
    AuthenticationComponent,
    ConsultationComponent,
    NotificationComponent,
    MainComponent,
    CreationPrescripteurComponent,
    CreationSession1Component,
    TestComponent,
    MenuDemandeComponent,
    SuperAdminComponent
    //  DetailComponent
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
