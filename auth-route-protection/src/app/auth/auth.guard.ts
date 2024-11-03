import {CanActivateFn, RedirectCommand, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {map, take} from "rxjs/operators";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)

  return authService.user.pipe(
    take(1),
    map(user => {
      if (!!user) {
        return true;
      }
      return new RedirectCommand(router.parseUrl("/auth"));
    })
  )
};
