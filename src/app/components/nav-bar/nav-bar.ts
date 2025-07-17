import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../service/authService/auth-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  auth = inject(AuthService);
  route = inject(Router);
  @Inject(PLATFORM_ID) platformId: Object = inject(PLATFORM_ID);

  data: any;
  islogged: boolean = false;

  ngAfterContentChecked(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.data = this.auth.getUserNameFromToken();
      this.islogged = localStorage.getItem('user') !== null;
    }
  }

  logout() {
    this.auth.logout();
    this.route.navigate(['Login']);
  }
}
 