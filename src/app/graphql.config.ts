import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideApollo } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideApollo(() => ({
      cache: new InMemoryCache(),
      uri: 'http://localhost:3000/graphql',
    })),
  ],
};
