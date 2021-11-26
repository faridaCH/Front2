import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { RdvDetailsComponent } from './rdv/rdv-details/rdv-details.component';
import { RdvComponent } from './rdv/rdv.component';
import { VilleComponent } from './ville/ville.component';

const routes: Routes = [
  { path : "login" , component: LoginComponent,  },
  { path : "ville" , component: VilleComponent },
  { path : "patient" , component: PatientComponent },
  { path : "rdv" , component: RdvComponent },
  { path : "rdv/addedit/:id" , component: RdvDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
