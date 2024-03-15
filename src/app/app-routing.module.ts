import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/creation_session/home.component';
import { LogComponent } from './component/log/log.component';
import { EditComponent } from './component/prescripteur/prescripteur.component';
import { HeaderComponent } from './component/header/header.component';
import { MenuComponent } from './component/menu/menu.component';
const routes: Routes = [
  {path:'',component:LogComponent},
  {path:'home',component:HomeComponent},
  {path:'edit',component:EditComponent},
  {path:'header',component:HeaderComponent},
  {path:'session',component:HomeComponent},
  {path:'menu',component:MenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
