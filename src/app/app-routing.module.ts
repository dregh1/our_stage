import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/creation_session/home.component';
import { LogComponent } from './component/log/log.component';
import { EditComponent } from './component/prescripteur/prescripteur.component';
import { HeaderComponent } from './component/header/header.component';
import { MenuComponent } from './component/menu/menu.component';
import { AuthenticationComponent } from './component/authentication/authentication.component';
import { TesteComponent } from './teste/teste.component';
import { ConsultationComponent } from './component/consultation/consultation.component';
import { ValidationComponent } from './component/validation/validation.component';
import { CreationPrescriComponent } from './component/creation-prescri/creation-prescri.component';
import { AffichagePrescriComponent } from './component/affichage-prescri/affichage-prescri.component';
import { NotificationComponent } from './component/notification/notification.component';
import { MainComponent } from './component/main/main.component';
const routes: Routes = [
  {path:'',component:AuthenticationComponent},
  {path:'main',component:MainComponent,
        children:[
            {path:'achat/:id',component:EditComponent},
            {path:'header',component:HeaderComponent},
            {path:'session',component:HomeComponent},
            {path:'menu',component:MenuComponent},
            {path:'auth',component:AuthenticationComponent},
            {path:'log',component:LogComponent},
            {path:'teste',component:TesteComponent},
            {path:'consultation',component:ConsultationComponent},
            {path:'crea',component:CreationPrescriComponent},
            {path:'aff',component:AffichagePrescriComponent},
            {path:'notification',component:NotificationComponent}
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
