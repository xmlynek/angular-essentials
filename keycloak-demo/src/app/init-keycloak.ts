import {KeycloakService} from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8081',
        realm: 'inkognix',
        clientId: 'frontend'
      },
      initOptions: {
        // onLoad: 'login-required',
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
        enableLogging: true,
      },
      loadUserProfileAtStartUp: true,
      bearerExcludedUrls: ['/assets', '/clients/public'],
    });
}
