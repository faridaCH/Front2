import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { RdvDetailsComponent } from './rdv/rdv-details/rdv-details.component';
import { RdvComponent } from './rdv/rdv.component';
import { VilleComponent } from './ville/ville.component';

const routes: Routes = [
  { path : "login" , component: LoginComponent },
  { path : "ville" , component: VilleComponent , canActivate: [AuthGuard] },
  { path : "patient" , component: PatientComponent , canActivate: [AuthGuard] },
  { path : "rdv" , component: RdvComponent , canActivate: [AuthGuard] },
  { path : "rdv/addedit/:id" , component: RdvDetailsComponent, canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
