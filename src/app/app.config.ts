import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app.routes';

import { environment as env } from './../environment/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAuth0({
      ...env.auth,
      httpInterceptor: {
        ...env.httpInterceptor,
      },
    }),
  ]
};
