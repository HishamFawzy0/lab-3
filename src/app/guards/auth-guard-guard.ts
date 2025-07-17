import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/authService/auth-service';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const routee = inject(Router);

  
    if (authService.isLoggedIn) {
      return true; // يسمح له يدخل
    } else {
      routee.navigate(['/Login']);
      return false; // يمنعه من الدخول ويروح للـ Login
    }
};
 