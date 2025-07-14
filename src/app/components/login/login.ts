import { Component, inject, NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../../service/authService/auth-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  formData: any = {};

  flag: boolean = false;
  errorex!: string;

  auth = inject(AuthService);

  router = inject(Router);

  onSubmit(form: any) {
    if (form.valid) {
      if (
        this.formData.email === 'hishamfawzy16@gmail.com' &&
        this.formData.password === '123456'
      ) {
        this.auth.login(this.formData);
        this.router.navigate(['/home']);
      } else if (!this.formData.email && !this.formData.password) {
        this.flag = true;
        this.errorex = 'Please enter email and password';
      } else if (!this.formData.email) {
        this.flag = true;
        this.errorex = 'Please enter email';
      } else if (!this.formData.password) {
        this.flag = true;
        this.errorex = 'Please enter password';
      } else {
        this.flag = true;
        this.errorex = 'Wrong email or password';
      }
    } else {
      this.flag = true;
      this.errorex = 'Please enter email and password';
      console.log('Form is invalid');
    }
  }
}
