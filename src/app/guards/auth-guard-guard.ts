import { CanActivateFn } from '@angular/router';
import { AuthService } from '../service/authService/auth-service';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.isLoggedIn) {
    return true;
  } else {
    return false;
  }
};
