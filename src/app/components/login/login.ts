import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/authService/auth-service';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  formData = {
    Email: '',
    Password: '',
  };

  flag = false;
  errorex = '';

  auth = inject(AuthService);
  router = inject(Router);

  onSubmit(form: any) {
    if (!form.valid) {
      this.flag = true;
      this.errorex = 'Please fill in all required fields';
      return;
    }

    this.auth.getlogin(this.formData).subscribe({
      next: (res) => {
        this.auth.jwtToken = res.token;
        this.auth.realdata = jwtDecode(res.token);
        console.log(this.auth.realdata);
        this.auth.login(); // التوكن موجود خلاص
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
        this.flag = true;
        this.errorex = 'Invalid email or password';
      },
      complete: () => {
        console.log('Login request complete.');
      },
    });
  }
}
