import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from '../classes/patient';
import { Ville } from '../classes/ville';
import { PatientService } from '../services/patient.service';
import { VilleService } from '../services/ville.service';
import { httpOptions } from '../variables';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patient: Patient = new Patient()
  patients: Array<Patient> = []
  villes: Array<Ville> = []
  search: string = ""
  errorMessage: string = ""
  success: boolean = false

  @ViewChild('closebutton') closebuttonelement: any;

  constructor(private vs: VilleService, private ps: PatientService) {
  }

  ngOnInit(): void {
    this.reloadPatients()

    this.vs.getAll().subscribe({
      next: (data) => { this.villes = data },
      error: (err) => { console.log(err.error.message) }
    });
  }

  reloadPatients() {
    this.ps.getAll(this.search).subscribe(
      data => { this.patients = data }
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
