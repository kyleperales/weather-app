import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'weather',
    loadChildren: () => import('./weather/weather.module').then(m => m.WeatherModule),
    canActivate: [authGuardFn],
  },
  { path: '**', redirectTo: '/login' }
];
