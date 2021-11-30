import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { Patient } from '../classes/patient';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor( private http : HttpClient, private config : ConfigService ) { 

  }

  getAll( s ?: string ) : Observable<Patient[]> {
    console.log( environment.backendUri + "patient" 
    + ( s == undefined ? "" : "?search=" + s ) )
    return this.http.get<Patient[]>( environment.backendUri + "patient" 
    + ( s == undefined ? "" : "?search=" + s )
    , this.config.httpOptions ); 
  }

  delete( id ?: number )  : Observable<any>{
    return this.http.delete( environment.backendUri + "patient/"+id , this.config.httpOptions )
  }

  getById( id ?: number ) : Observable<Patient>{
    return this.http.get<Patient>( environment.backendUri + "patient/"+id , this.config.httpOptions ); 
  }

  add( v : Patient ):Observable<any>{
    return this.http.post( environment.backendUri + "patient" , v , this.config.httpOptions ); 
  }

  update( v : Patient  ): Observable<any>{
    return this.http.put( environment.backendUri + "patient/"+v.id , v 
    , this.config.httpOptions ); 
  } 
}
