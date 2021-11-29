import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../classes/user';
import { HeaderComponent } from '../header/header.component';
import { httpOptions } from '../variables';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ""
  password = ""

  constructor( private http : HttpClient, private router : Router ) { }

  ngOnInit(): void {
  }

  authenticate(){
    let u = {"username" : this.username , "password" : this.password }
    
    // http://localhost:8080/api/login
    this.http.post<User>( environment.backendUri + "login" , u  ,httpOptions ).subscribe(
      {
        next: (data) => { 
          sessionStorage.setItem("connected" , "1" ); 
          sessionStorage.setItem("user" , JSON.stringify(data) )
          this.router.navigate(['patient'])  
        },
        error: (err) => { console.log(err.error.message) }
      }
    )
  }
}
