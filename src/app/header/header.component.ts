import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { User } from '../classes/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor( private router : Router , public guard : AuthGuard ) { }

  ngOnInit(): void {
    
  }

  logout():void {
    console.log( "logout" ); 
    sessionStorage.removeItem("connected")
    this.router.navigate(['login'])
  }

}
