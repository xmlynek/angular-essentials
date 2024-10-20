import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {debounceTime} from "rxjs";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  private form = viewChild.required<NgForm>("form");
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

      const subscription = this.form().valueChanges?.pipe(debounceTime(500))
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
        this.form().controls['email'].setValue(email);
      }, 1);
    }
  }


  protected onSubmit(formData: NgForm) {
    console.log(formData);

    console.log(formData.form);
    if (formData.valid) {
      console.log(formData.value);
      console.log(formData.form.value)
      formData.resetForm();
    } else {
      console.log(formData.errors)
      console.error('Invalid form');
    }
  }

}
