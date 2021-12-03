import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { Patient } from '../classes/patient';
import { Ville } from '../classes/ville';
import { ConfigService } from '../services/config.service';
import { PatientService } from '../services/patient.service';
import { RdvService } from '../services/rdv.service';
import { VilleService } from '../services/ville.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  providers: [ConfigService]
})
export class PatientComponent implements OnInit {

  patient: Patient = new Patient()
  patientRdv : Array<any> = []

  patients: Array<Patient> = []
  villes: Array<Ville> = []
  search: string = ""
  errorMessage: string = ""
  success: boolean = false

  @ViewChild('closebutton') closebuttonelement: any;

  constructor(private vs: VilleService, public ps: PatientService , private rdvs: RdvService
    , public config: ConfigService) {
  }


  
  // PatientRDV*
  /*[
    1 = [ rdv1, rdv2 ]
    10 = [rdv10]
  ]*/

  getPatientRdv(): void {
    this.patientRdv = [];
    
    // on récupère la liste des rdv afin de les trier / organiser dans le tableau this.patientRdv
    this.rdvs.getAll().subscribe(
      data => {
        data.forEach( rdv => {
          //[ rdv1 , rdv2... ]
          if( rdv.patient != undefined && rdv.patient.id != undefined ){
            
            if( this.patientRdv[rdv.patient.id] == undefined ){
              this.patientRdv[rdv.patient.id] = []
            }

            this.patientRdv[rdv.patient.id].push( rdv )
            
          }
        } )

        // 
        let patientTries : Array<Patient> = []
        data.forEach( rdv => {
          if( rdv.patient != undefined )
            patientTries.push(rdv.patient)
        } )

        this.patients.forEach( patient => {
          if( patient.id != undefined && this.patientRdv[patient.id] == undefined )
            patientTries.push(patient)
        } )

        this.patients = patientTries

      }
    )


  }

  ngOnInit(): void {
    this.reloadPatients()

    this.vs.getAll().subscribe({
      next: (data) => { this.villes = data },
      error: (err) => { console.log(err.error.message) }
    });
  }


  reloadPatients() {
    console.log(this.config.httpOptions.headers)
    
    this.ps.getAll(this.search).subscribe(
      data => { 
        this.patients = data 
        this.getPatientRdv()
        // je boucle sur les patients pour faire une req http et récupérer les rdv de chaq patient
        /* data.forEach( patient => {
          this.rdvs.getAll(undefined , patient.id ).subscribe(
            drdv => { 
              if( patient.id != undefined )
                this.patientRdv[ patient.id  ] = drdv 
              }
          )
          
        }  ) */

        console.log( this.patientRdv )
      }
      //, err => console.log( "Une erreur est survenue" )
    );
    
  }

  reset(): void {
    this.errorMessage = "";
    this.patient = new Patient();
  }

  submitPatient(): void {
    let obs: Observable<any>;
    if (this.patient.id == undefined) { // Ajout
      obs = this.ps.add(this.patient);
    } else { // Edition
      obs = this.ps.update(this.patient);
    }

    obs.subscribe(
      {
        next: () => {
          this.reloadPatients();
          this.closebuttonelement.nativeElement.click();
          this.success = true;
          setTimeout(() => {                           // <<<---using ()=> syntax
            this.success = false;
          }, 5000);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        }
      }
    );
  }

  checkVille(v1: Ville, v2: Ville): boolean {
    return v1 != undefined && v2 != undefined && v1.id == v2.id;
  }

  edit(id?: number) {
    this.ps.getById(id).subscribe(
      data => { this.patient = data }
      //, err => console.log( "Une erreur est survenue" )
    );
  }

  delete(id: number | undefined): void {

    if (confirm("Êtes vous sur ?")) {
      this.ps.delete(id).subscribe(
        data => {
          this.reloadPatients();
        }
        //, err => console.log( "Une erreur est survenue" )
      );
    }
  }

}
