import { Component } from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {InvestmentFormComponent} from "./investment-form/investment-form.component";
import {InvestmentResultsComponent} from "./investment-results/investment-results.component";
import {AnnualData} from "./investment-results/investment-results.model";
import {InvestmentFormModel} from "./investment-form/investment-form.model";
import {InvestmentResultsService} from "./investment-results/investment-results.service";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, InvestmentFormComponent, InvestmentResultsComponent]
})
export class AppComponent {

  protected investmentResults?: AnnualData[];
  protected investmentFormValues?: InvestmentFormModel;

  constructor(protected investmentResultService: InvestmentResultsService) {

  }

  protected handleInvestmentFormSubmit(data: InvestmentFormModel) {
    this.investmentFormValues = data;
    console.log("Handling submit data. ", data);

    this.investmentResults = this.investmentResultService.calculateInvestmentResults(data);
    console.log(this.investmentResultService.calculateInvestmentResults(data));

  }

}
