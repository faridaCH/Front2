import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ville } from '../classes/ville';
import { VilleService } from '../services/ville.service';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {

  villes: Array<Ville> = [];
  ville: Ville = new Ville();
  search: string = ""
  errorMessage: string = ""
  success: boolean = false

  @ViewChild('closebutton') closebuttonelement: any;

  constructor(private vs: VilleService) {
  }

  ngOnInit(): void {
    this.reloadCities();
  }

  reloadCities(): void {
    console.log("search == " + this.search);
    this.villes = [];

    this.vs.getAll().subscribe({
      next: (data) => { this.villes = data },
      error: (err) => { console.log(err.error.message) }
    });


  }

  clearCities(): void {
    this.villes = [];
  }

  resetCity() {
    this.ville = new Ville();
  }

  delete(id: number | undefined): void {

    if (confirm("Êtes vous sur ?")) {
      this.vs.delete(id).subscribe(
        data => {
          this.reloadCities();
        }
        //, err => console.log( "Une erreur est survenue" )
      );
    }
  }

  edit(id?: number) {
    this.vs.getById(id).subscribe(
      data => { this.ville = data }
      //, err => console.log( "Une erreur est survenue" )
    );
  }

  submitCity() {
    let obs: Observable<any>;
    if (this.ville.id == undefined) { // Ajout
      obs = this.vs.add(this.ville);
    } else { // Edition
      obs = this.vs.update(this.ville);
    }

    obs.subscribe(
      {
        next: () => {
          this.reloadCities();
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

}
