import {  ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { VilleComponent } from './ville/ville.component';
import {HttpClientModule} from '@angular/common/http';
import { PatientComponent } from './patient/patient.component'; 
import { FormsModule } from '@angular/forms';
import { RdvComponent } from './rdv/rdv.component';
import { RdvDetailsComponent } from './rdv/rdv-details/rdv-details.component';
import { LoginComponent } from './login/login.component';
import { VilleDetailsComponent } from './ville-details/ville-details.component';
import { ConfigService } from './services/config.service';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    VilleComponent,
    PatientComponent,
    RdvComponent,
    RdvDetailsComponent,
    LoginComponent,
    VilleDetailsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ ConfigService ],
  bootstrap: [AppComponent ],
  
})
export class AppModule { 
}
