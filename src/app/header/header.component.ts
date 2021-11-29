import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { User } from '../classes/user';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[FooterComponent ],
})
export class HeaderComponent implements OnInit {


  constructor( private router : Router , public guard : AuthGuard , private fc : FooterComponent) { }

  ngOnInit(): void {
    
  }

  doact(){
    this.fc.update(); 
  }

  logout():void {
    console.log( "logout" ); 
    sessionStorage.removeItem("connected")
    this.router.navigate(['login'])
    sessionStorage.removeItem("user")
    this.fc.update(); 
    //ChangeDetectorRef.detectChanges()
  }

}
