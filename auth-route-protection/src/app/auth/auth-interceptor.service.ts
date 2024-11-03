import {inject, Injectable} from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest
} from "@angular/common/http";
import {Observable, switchMap} from "rxjs";
import {AuthService} from "./auth.service";
import {take} from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  private authService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(take(1), switchMap(user => {
      const authToken = user?.token;
      if (!authToken) {
        return next.handle(req);
      }
      const newReq = req.clone({
        params: new HttpParams().set('auth', authToken),
      });
      return next.handle(newReq);
    }));
  }

}
