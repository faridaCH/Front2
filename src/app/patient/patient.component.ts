import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Patient } from '../classes/patient';
import { httpOptions } from '../variables';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patients : Array<Patient> = []; 

  constructor( private http : HttpClient ) {
  }

  ngOnInit(): void {
    this.http.get<Patient[]>( environment.backendUri + "patient" , httpOptions ).subscribe(
      data => { this.patients = data }
      //, err => console.log( "Une erreur est survenue" )
    );
  }

}
