import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  get user(){
    return this.authService.user;
  }

  constructor( private router: Router,
               private authService: AuthService ) { }

  

 logout(){
  this.router.navigateByUrl('/auth');
  this.authService.logout();
  
 }
 
}
