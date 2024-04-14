import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';

export const routes: Routes = [
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
  {
    path: 'weather',
    loadChildren: () => import('./weather/weather.module').then(m => m.WeatherModule),
    canActivate: [authGuardFn],
  }
];
