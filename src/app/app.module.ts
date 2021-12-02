import {  ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { VilleComponent } from './ville/ville.component';
import {HttpClientModule} from '@angular/common/http';
import { PatientComponent } from './patient/patient.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RdvComponent } from './rdv/rdv.component';
import { RdvDetailsComponent } from './rdv/rdv-details/rdv-details.component';
import { LoginComponent } from './login/login.component';
import { VilleDetailsComponent } from './ville/ville-details/ville-details.component';
import { ConfigService } from './services/config.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { VilleReducer } from './ngrx/villes.reducer';
import { EffectsModule } from '@ngrx/effects';
import { VilleEffects } from './ngrx/villes.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


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
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({catalogState:VilleReducer}),
    EffectsModule.forRoot([VilleEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [ ConfigService ],
  bootstrap: [AppComponent ],
  
})
export class AppModule { 
}
