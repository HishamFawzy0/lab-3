import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Cart } from './components/cart/cart';
import { Notfound } from './components/notfound/notfound';
import { authGuardGuard } from './guards/auth-guard-guard';
import { Login } from './components/login/login';
import { RedirectComponent } from './components/redirect-component/redirect-component';
import { Register } from './components/register/register';

export const routes: Routes = [
  { path: '', component: RedirectComponent },
  { path: 'Login', component: Login },
  { path: 'Register', component: Register  },
  { path: 'home', component: Home, canActivate: [authGuardGuard] },
  { path: 'cart', component: Cart, canActivate: [authGuardGuard] },
  { path: '**', component: Notfound },
];
