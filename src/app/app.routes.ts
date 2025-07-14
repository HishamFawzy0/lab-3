import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Cart } from './components/cart/cart';
import { Notfound } from './components/notfound/notfound';
import { authGuardGuard } from './guards/auth-guard-guard';
import { Login } from './components/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: Login },
  { path: 'home', component: Home, canActivate: [authGuardGuard] },
  { path: 'cart', component: Cart, canActivate: [authGuardGuard] },
  { path: '**', component: Notfound },
];
 