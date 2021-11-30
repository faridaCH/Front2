import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { AuthGuard } from '../auth.guard';
import { User } from '../classes/user';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { httpOptions } from '../variables';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[FooterComponent ]
})
export class LoginComponent implements OnInit {

  username = ""
  password = ""

  constructor( private http : HttpClient, private router : Router , private app : AppComponent, private guard: AuthGuard) { }

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
          this.app.user = data
        },
        error: (err) => { console.log(err.error.message) }
      }
    )
  }
}
