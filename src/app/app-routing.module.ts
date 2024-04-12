import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { MenuComponent } from './component/menu/menu.component';
import { AuthenticationComponent } from './component/authentication copy/authentication.component';
import { ConsultationComponent } from './component/consultation/consultation.component';
import { ValidationComponent } from './component/validation/validation.component';
import { AffichagePrescriComponent } from './component/affichage-prescri/affichage-prescri.component';
import { NotificationComponent } from './component/notification/notification.component';
import { MainComponent } from './component/main/main.component';
import { CreationSession1Component } from './component/creation-session1/creation-session1.component';
import { DetailDemandeComponent } from './component/detail-demande/detail-demande.component';
import { CreationPrescripteurComponent } from './component/creation-prescripteur/creation-prescripteur.component';
const routes: Routes = [
  {path:'',component:AuthenticationComponent},
  {path:'main',component:MainComponent,
        children:[
            {path:'header',component:HeaderComponent},
            {path:'menu',component:MenuComponent},
            {path:'auth',component:AuthenticationComponent},
            {path:'consultation',component:ConsultationComponent},
            {path:'aff/:id',component:AffichagePrescriComponent},
            {path:'notification',component:NotificationComponent},
            {path:'creationsession',component:CreationSession1Component},
            {path:'detaildemande/:id',component:DetailDemandeComponent},
            {path:'creationprescripteur',component:CreationPrescripteurComponent}
            // {path:'detail/:type',children[{path:':id',component:pagecomponent}]}
        ]
  },
  {path:'validation',component:ValidationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
