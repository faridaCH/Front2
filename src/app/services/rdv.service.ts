import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rdv } from '../classes/rdv';
import { httpOptions } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  constructor( private http : HttpClient ) { 

  }

  getAll( s ?: string ) : Observable<Rdv[]> {
    return this.http.get<Rdv[]>( environment.backendUri + "rdv" 
    + ( s == undefined ? "" : "?search=" + s )
    , httpOptions ); 
  }

  delete( id ?: number )  : Observable<any>{
    return this.http.delete( environment.backendUri + "rdv/"+id ,httpOptions )
  }

  getById( id ?: number ) : Observable<Rdv>{
    return this.http.get<Rdv>( environment.backendUri + "rdv/"+id ,
     httpOptions ); 
  }

  add( rdv : Rdv ):Observable<any>{
    return this.http.post( environment.backendUri + "rdv" , rdv ,httpOptions ); 
  }

  update( rdv : Rdv  ): Observable<any>{
    return this.http.put( environment.backendUri + "rdv/"+rdv.id , rdv 
    ,httpOptions ); 
  } 
}
