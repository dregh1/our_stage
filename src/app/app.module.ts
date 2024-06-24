import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from './component/Authentication/authentication.component';
import { ConsultationComponent } from './component/consultation/consultation.component';
import { NotificationComponent } from './component/notification/notification.component';
import { MainComponent } from './component/main/main.component';
import { CreationPrescripteurComponent } from './component/CreationPrescripteur/CreationPrescripteur.component';
import { CreationSession1Component } from './component/CreationSession/CreationSession.component';
import { HeaderComponent } from './component/header/header.component';
import { TestComponent } from './component/DetailParDemande/DetailParDemande.component';
import { ValidationComponent } from './component/validation/validation.component';
import { SuperAdminComponent } from './component/super-admin/super-admin.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MenuDemandeComponent } from './component/MenuDemande/MenuDemande.component';
import { DecimalPipe } from '@angular/common';
import { IndexComponent } from './index/index.component';
// import { CommonModule } from '@angular/common';
// import { GrapheComponent } from './graphe/graphe.component';

registerLocaleData(localeFr);
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
    SuperAdminComponent,
    IndexComponent
    //  DetailComponent
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule,ReactiveFormsModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' }, DecimalPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
