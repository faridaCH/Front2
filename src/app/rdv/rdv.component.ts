import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../classes/patient';
import { Rdv } from '../classes/rdv';
import { PatientService } from '../services/patient.service';
import { RdvService } from '../services/rdv.service';

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.css']
})
export class RdvComponent implements OnInit {

  rdvs: Array<Rdv> = []
  patients: Array<Patient> = []
  rdv : Rdv = new Rdv();
  success = false
  errorMessage = "" 
  
  // search params
  patientRecherche : number = 0
  datesearch : Date = new Date()

  constructor( private rdvService: RdvService, private ps : PatientService  ) { }

  ngOnInit(): void {
    this.reload();

    this.ps.getAll().subscribe({
      next: (data) => { this.patients = data },
      error: (err) => { console.log(err.error.message) }
    });

  }

  reload(): void {
    this.rdvs = [];

    this.rdvService.getAll( this.datesearch , this.patientRecherche ).subscribe({
      next: (data) => { this.rdvs = data },
      error: (err) => { console.log(err.error.message) }
    });
  }

  delete(id: number | undefined): void {

    if (confirm("Êtes vous sur ?")) {
      this.rdvService.delete(id).subscribe(
        data => {
          this.reload();
        }
        //, err => console.log( "Une erreur est survenue" )
      );
    }
  }

}
