import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from '../classes/patient';

import { httpOptions } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor( private http : HttpClient ) { 

  }

  getAll( s ?: string ) : Observable<Patient[]> {
    console.log( environment.backendUri + "patient" 
    + ( s == undefined ? "" : "?search=" + s ) )
    return this.http.get<Patient[]>( environment.backendUri + "patient" 
    + ( s == undefined ? "" : "?search=" + s )
    , httpOptions ); 
  }

  delete( id ?: number )  : Observable<any>{
    return this.http.delete( environment.backendUri + "patient/"+id ,httpOptions )
  }

  getById( id ?: number ) : Observable<Patient>{
    return this.http.get<Patient>( environment.backendUri + "patient/"+id ,
     httpOptions ); 
  }

  add( v : Patient ):Observable<any>{
    return this.http.post( environment.backendUri + "patient" , v ,httpOptions ); 
  }

  update( v : Patient  ): Observable<any>{
    return this.http.put( environment.backendUri + "patient/"+v.id , v 
    ,httpOptions ); 
  } 
}
