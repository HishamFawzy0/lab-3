import { Component } from '@angular/core';
import { AuthService } from '../../service/authService/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect-component',
  imports: [],
  templateUrl: './redirect-component.html',
  styleUrl: './redirect-component.css',
})
export class RedirectComponent {
  constructor(private auth: AuthService, private router: Router) {
    
  }
  ngOnInit(): void {
    if (this.auth.isLoggedIn) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/Login']);
    }
  }
}
