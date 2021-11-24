import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import Ville from '../classes/ville';
import { httpOptions } from '../variables';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {

  villes : Array<Ville> = []; 
  ville : Ville = new Ville(); 

  @ViewChild('closebutton') closebuttonelement:any; 

  constructor( private http : HttpClient ) {
  }

  ngOnInit(): void {
    this.reloadCities(); 
  } 

  reloadCities():void{
    this.villes = []; 
    this.http.get<Ville[]>( environment.backendUri + "ville" , httpOptions ).subscribe(
      data => { this.villes = data }
      //, err => console.log( "Une erreur est survenue" )
    );

  }

  clearCities():void{
    this.villes = []; 
  }

  resetCity(){
    this.ville = new Ville(); 
  }

  delete( id : number | undefined ):void{

    if( confirm("Êtes vous sur ?") ){
      this.http.delete( environment.backendUri + "ville/"+id ,httpOptions ).subscribe(
        data => { 
          this.reloadCities(); 
        }
        //, err => console.log( "Une erreur est survenue" )
      );
    }
  }

  edit( id ?: number ){
    this.http.get<Ville>( environment.backendUri + "ville/"+id , httpOptions ).subscribe(
      data => { this.ville = data }
      //, err => console.log( "Une erreur est survenue" )
    );
  }

  submitCity(){
    if( this.ville.id == undefined ){ // Ajout
      this.http.post( environment.backendUri + "ville" , this.ville ,httpOptions ).subscribe(
        data => { 
          this.closebuttonelement.nativeElement.click(); 
          this.reloadCities();  }
        //, err => console.log( "Une erreur est survenue" )
      );
    }else{ // Edition
      this.http.put( environment.backendUri + "ville/"+this.ville.id , this.ville ,httpOptions ).subscribe(
        data => { 
          this.closebuttonelement.nativeElement.click(); 
          this.reloadCities();  }
        //, err => console.log( "Une erreur est survenue" )
      );
    }
    
  }

}
