import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Patient } from '../classes/patient';
import { Ville } from '../classes/ville';
import { httpOptions } from '../variables';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patient : Patient = new Patient(); 
  patients : Array<Patient> = []; 
  villes : Array<Ville> = []; 
  @ViewChild('closebutton') closebuttonelement:any; 

  constructor( private http : HttpClient ) {
  }

  ngOnInit(): void {
    this.reloadPatients()

    this.http.get<Patient[]>( environment.backendUri + "ville" , httpOptions ).subscribe(
      data => { this.villes = data }
      //, err => console.log( "Une erreur est survenue" )
    );
    
  }

  reloadPatients(){
    this.http.get<Patient[]>( environment.backendUri + "patient" , httpOptions ).subscribe(
      data => { this.patients = data }
      //, err => console.log( "Une erreur est survenue" )
    );
  }

  reset():void{
    this.patient = new Patient(); 
  }

  submitPatient(): void{
    if( this.patient.id == undefined ){ // Ajout
      this.http.post( environment.backendUri + "patient" , this.patient ,httpOptions ).subscribe(
        data => { 
          this.closebuttonelement.nativeElement.click(); 
          this.reloadPatients();  }
        //, err => console.log( "Une erreur est survenue" )
      );
    }else{ // Edition
      this.http.put( environment.backendUri + "patient/"+this.patient.id , this.patient ,httpOptions ).subscribe(
        data => { 
          this.closebuttonelement.nativeElement.click(); 
          this.reloadPatients();  }
        //, err => console.log( "Une erreur est survenue" )
      );
    }
  }

  checkVille( v1 : Ville, v2 : Ville ) : boolean{
    return v1 != undefined && v2!=undefined && v1.id == v2.id; 
  }

  edit( id ?: number ){
    this.http.get<Patient>( environment.backendUri + "patient/"+id , httpOptions ).subscribe(
      data => { this.patient = data }
      //, err => console.log( "Une erreur est survenue" )
    );
  }

  delete( id : number | undefined ):void{

    if( confirm("Êtes vous sur ?") ){
      this.http.delete( environment.backendUri + "patient/"+id ,httpOptions ).subscribe(
        data => { 
          this.reloadPatients(); 
        }
        //, err => console.log( "Une erreur est survenue" )
      );
    }
  }

}
