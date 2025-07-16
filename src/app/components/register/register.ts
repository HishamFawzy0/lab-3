import { Router, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/authService/auth-service';
import { jwtDecode } from 'jwt-decode';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  flag = false;
  errorex = '';

  private auth = inject(AuthService);
  private router = inject(Router);

  formData = {
    Email: '',
    Password: '',
    FirstName: '',
    LastName: '',
    Age: '',
  };
  onSubmit(form: any) {
    if (!form.valid) {
      this.flag = true;
      this.errorex = 'Please fill in all required fields';
      return;
    }
    this.auth.register(this.formData).subscribe({
      next: (res) => {
        console.log('Response:', res);
        this.router.navigate(['/Login']);
      },
      error: (err) => {
          console.log('Registration Error:', err);
          this.flag = true;
          try {
            const parsedError = JSON.parse(err.error); // بيكون array من الأخطاء
            const duplicateEmailError = parsedError.find(
              (e: any) => e.code === 'DuplicateUserName'
            );

            if (duplicateEmailError) {
              this.errorex = 'Email already exists. Please use another one.';
            } else {
              this.errorex =
                parsedError[0]?.description ||
                'Registration failed. Please try again.';
            }
          } catch {
            this.errorex = 'Registration failed. Please try again.';
          }
        
      },
      complete: () => {
        console.log('Registration request complete.');
      },
    });
  }
}
