import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(protected override router: Router, protected keycloak: KeycloakService) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    const requiredRoles = route.data["roles"];
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    return requiredRoles.every((role: any) => this.roles.includes(role));
  }
}
