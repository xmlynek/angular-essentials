import {Component, inject, signal} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  protected isLoginMode = signal<boolean>(false);
  protected isLoading = signal<boolean>(false);
  protected error = signal<string>("");

  private authService = inject(AuthService);
  private router = inject(Router);

  onSwitchMode() {
    this.isLoginMode.update(prev => !prev);
  }

  private authObs: Observable<AuthResponseData> = new Observable()


  onSubmit(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      console.log("invalid form");
      return;
    }

    this.isLoading.set(true);
    this.error.set("");

    if (this.isLoginMode()) {
      this.authObs = this.authService.login(form.value.email, form.value.password);
    } else {
      this.authObs = this.authService.signup(form.value.email, form.value.password);
    }

    this.authObs.subscribe({
      next: (responseData: AuthResponseData) => {
        console.log(responseData);
        this.isLoading.set(false);
        this.router.navigate(['/recipes']);
      },
      error: (error: any) => {
        console.error(error);
        this.error.set(error.message);
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    })

    form.reset();
  }
}
