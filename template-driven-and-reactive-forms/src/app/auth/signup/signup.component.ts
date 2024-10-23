import {Component} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule, ValidatorFn,
  Validators
} from "@angular/forms";


const equalValues = (controlName1: string, controlName2: string): ValidatorFn => {
  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;

    if (val1 === val2) {
      return null;
    }

    return {ValuesNotEqual: true};
  }
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule]
})
export class SignupComponent {

  protected signupForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    passwords: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.min(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, {validators: [equalValues('password', 'confirmPassword')]}),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormGroup({
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student',
      [Validators.required]),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]),
    agree: new FormControl(false, [Validators.requiredTrue]),
  })

  onSubmit() {
    if (this.signupForm.invalid) {
      console.log('INVALID FORM')
      return
    }

    console.log(this.signupForm.value);
  }

}
