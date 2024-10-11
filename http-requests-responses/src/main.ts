import {bootstrapApplication} from '@angular/platform-browser';

import {AppComponent} from './app/app.component';
import {
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors
} from "@angular/common/http";
import {tap} from "rxjs";

function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  // const req = request.clone({headers: request.headers.set('X-DEBUG', 'TESTING')});

  console.log('Request:', request.urlWithParams);
  console.log(request);
  return next(request)
  .pipe(tap({
    next: (event) => {
      if (event.type === HttpEventType.Response) {
        console.log('Response:', event);
        console.log(event.body);
      }
    },
  }));
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([loggingInterceptor]))
  ]
})
.catch((err) => console.error(err));
