import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Cart } from './components/cart/cart';
import { Notfound } from './components/notfound/notfound';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'cart', component: Cart },
  { path: '**', component: Notfound },
];
 