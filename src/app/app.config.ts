import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideApollo } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideApollo(() => ({
      cache: new InMemoryCache(),
      uri: 'http://localhost:3000/graphql',
    })),
  ],
};