import {Component, EventEmitter, Output, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InvestmentFormModel} from "./investment-form.model";


@Component({
  selector: 'app-investment-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './investment-form.component.html',
  styleUrl: './investment-form.component.css'
})
export class InvestmentFormComponent {

  public formSubmit = output<InvestmentFormModel>()

  protected investmentForm = new FormGroup({
    initialInvestment: new FormControl(1000, [
      Validators.required,
      Validators.min(0)
    ]),
    annualInvestment: new FormControl(1000, [
      Validators.required,
      Validators.min(0),
      Validators.nullValidator,
    ]),
    expectedReturn: new FormControl(5, [
      Validators.required,
      Validators.min(0),
      Validators.max(1000)
    ]),
    duration: new FormControl(10, [
      Validators.required,
      Validators.min(1),
      Validators.max(50)
    ]),
  })

  protected onSubmit() {
    if (this.investmentForm.valid) {
      this.formSubmit.emit({
        initialInvestment: this.investmentForm.value.initialInvestment!,
        annualInvestment: this.investmentForm.value.annualInvestment!,
        expectedReturn: this.investmentForm.value.expectedReturn!,
        duration:  this.investmentForm.value.duration!,
      })
      console.log("Form submitted")
    } else {
      console.log("Invalid form")
    }
  }

}
