import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  httpOptions = {
    headers : new HttpHeaders({
      'Authorization' : "" 
    })
  }

  
  constructor() { }


}
