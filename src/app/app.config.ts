import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {KeycloakService} from "keycloak-angular";

import {HTTP_INTERCEPTORS,  HttpClientModule} from "@angular/common/http";
import {AuthInterceptorService} from "./services/auth.service";

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'ouss',
        clientId: 'frontend'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),HttpClientModule,KeycloakService,

    {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,

    multi: true,
    deps: [KeycloakService],
  },{
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi: true,
    }


  ]
};
