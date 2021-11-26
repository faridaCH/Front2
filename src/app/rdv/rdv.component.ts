import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  rdv : Rdv = new Rdv();
  success = false
  errorMessage = "" 

  constructor( private rdvService: RdvService, private ps : PatientService  ) { }

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.rdvs = [];

    this.rdvService.getAll().subscribe({
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
