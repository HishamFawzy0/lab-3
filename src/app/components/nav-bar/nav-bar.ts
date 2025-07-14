import { Component, inject, SimpleChanges } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../service/authService/auth-service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink,RouterLinkActive], 
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar {
  auth=inject(AuthService);
  route=inject(Router);
  
  islogged!: boolean ;

  ngAfterContentChecked(): void {
    if (localStorage.getItem('user') == null) {
      this.islogged = false;
    } else {
      this.islogged = true;
    }
  }
  
  
  logout() {
    this.auth.logout();
    this.route.navigate(['Login']);
  } 

}
