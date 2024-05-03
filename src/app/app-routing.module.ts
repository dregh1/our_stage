import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { AuthenticationComponent } from './component/authentication copy/authentication.component';
import { ConsultationComponent } from './component/consultation/consultation.component';
import { ValidationComponent } from './component/validation/validation.component';
import { NotificationComponent } from './component/notification/notification.component';
import { MainComponent } from './component/main/main.component';
import { CreationSession1Component } from './component/CreationSession/creation-session1.component';
import { CreationPrescripteurComponent } from './component/creation-prescripteur/creation-prescripteur.component';
import { TestComponent } from './component/DetailParDemande/DetailParDemande.component';
import { MenuDemandeComponent } from './component/MenuDemande/menu-demande.component';
const routes: Routes = [ 
  {path:'',component:AuthenticationComponent},
  {path:'main',component:MainComponent,
        children:[
          {path:'',redirectTo:'menu',pathMatch:'full'},
            {path:'header',component:HeaderComponent},
            {path:'auth',component:AuthenticationComponent},
            {path:'consultation',component:ConsultationComponent},
            {path:'MenuDemande',component:MenuDemandeComponent},
            
            {path:'notification',component:NotificationComponent},
            {path:'creationsession',component:CreationSession1Component},
            {path:'creationprescripteur',component:CreationPrescripteurComponent},
            {path:'detail',component:CreationPrescripteurComponent},
            // {path:'detail/:type',children[{path:':id',component:pagecomponent}]}
            {path:'teste/:id',component:TestComponent},
            
        ]
  },
  {path:'validation',component:ValidationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
