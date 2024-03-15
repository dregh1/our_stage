import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonnelService } from './services/personnel.service';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './component/creation_session/home.component';
import { LogComponent } from './component/log/log.component';
import { MenuComponent } from './component/menu/menu.component';
import { HeaderComponent } from './component/header/header.component';
import { EditComponent } from './component/prescripteur/prescripteur.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogComponent,
    EditComponent,
    MenuComponent,
    HeaderComponent
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
