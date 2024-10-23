import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule, ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";
import {debounceTime, of} from "rxjs";


const mustContainQuestionMark = (control: AbstractControl): ValidationErrors | null => {
  if (control.value.includes('?')) {
    return null;
  }
  return {mustContainQuestionMark: true};
}

const emailIsUnique = (control: AbstractControl) => {
  if (control.value !== "test@example.com") {
    return of(null);
  }
  return of({emailIsUnique: true});
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  protected form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email], [emailIsUnique]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), mustContainQuestionMark]),
  })

  // private form = viewChild.required<NgForm>("form");
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      //   const savedForm = localStorage.getItem("login-form");
      //   if (savedForm) {
      //     const {email} = JSON.parse(savedForm);
      //     setTimeout(() => {
      //       this.form().controls['email'].setValue(email);
      //     }, 1);
      //   }

      const subscription = this.form.valueChanges?.pipe(debounceTime(500))
      .subscribe({
        next: (changes) => {
          localStorage.setItem("login-form", JSON.stringify({email: changes?.email}))
          console.log(changes);
        },
        complete: () => {
          console.log('Completed');
        }
      });

      this.destroyRef.onDestroy(() => {
        subscription?.unsubscribe();
      });
    })
  }

  ngOnInit() {
    console.log('on init')

    const savedForm = localStorage.getItem("login-form");
    if (savedForm) {
      const {email} = JSON.parse(savedForm);
      setTimeout(() => {
        this.form.patchValue({email: email});
      }, 1);
    }

    const sub = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (changes) => {
        localStorage.setItem("login-form", JSON.stringify({email: changes?.email}))
        console.log(changes);
      },
      complete: () => {
        console.log('value changes completed')
      }
    })

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }

  get isEmailInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    )
  }

  get isPasswordInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    )
  }


  protected onSubmit() {

    console.log(this.form);
    if (this.form.valid) {
      console.log(this.form.value);
      this.form.reset();
    } else {
      console.log(this.form.errors)
      console.error('Invalid form');
    }
  }

}
