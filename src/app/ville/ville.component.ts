import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ville } from '../classes/ville';

import {map} from 'rxjs/operators';
import { VillesStateEnum, VilleState } from '../ngrx/villes.reducer';
import { GetAllVilleAction } from '../ngrx/villes.actions';
import { VilleService } from '../services/ville.service';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {

  villes: Array<Ville> = []
  nom: string = ""
  ville: Ville = new Ville();
  search : String = ""; 
  @ViewChild('closebutton') closebuttonelement: any;

  VillesState$:Observable<VilleState>|null=null;
  readonly VillesStateEnum= VillesStateEnum;

  constructor(private vs: VilleService , private store:Store<any>) { }

  /* ngOnInit(): void {
    this.updateCities()
    console.log( this.ville ); 
  }*/ 

  ngOnInit(): void {
    this.VillesState$=this.store.pipe(
      map((state)=>  state.catalogState)
    );

    this.store.dispatch(new GetAllVilleAction({}))
  }

  updateCities(): void {
    /* this.vs.loadCities( this.search ).subscribe(
      data => {
        this.villes = data;
        console.log(data);
      }
    ); */

    //this.store.dispatch(new GetAllVillesAction({}))

  }

  delete( id? : number ): void{
    
  }

  edit( id?: number ): void {
    
  }

}
