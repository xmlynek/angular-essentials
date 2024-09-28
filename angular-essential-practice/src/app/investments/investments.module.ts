import {NgModule} from "@angular/core";
import {InvestmentFormComponent} from "./investment-form/investment-form.component";
import {InvestmentResultsComponent} from "./investment-results/investment-results.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [InvestmentFormComponent, InvestmentResultsComponent],
  imports: [ReactiveFormsModule, CommonModule],
  exports: [InvestmentFormComponent, InvestmentResultsComponent]
})
export class InvestmentsModule {
}
