import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  user : User = new User();


  constructor( private router : Router , public guard : AuthGuard , private fc : FooterComponent , private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    
  }

  submit(){

  }

  logout():void {
    console.log( "logout" ); 
    sessionStorage.removeItem("connected")
    this.router.navigate(['login'])
    sessionStorage.removeItem("user")
   //ChangeDetectorRef.detectChanges()
  }

}
