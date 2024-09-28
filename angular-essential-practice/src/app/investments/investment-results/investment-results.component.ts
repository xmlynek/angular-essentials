import {Component, computed} from '@angular/core';
import {AnnualData} from "./investment-results.model";
import {InvestmentsService} from "../investments.service";

@Component({
  selector: 'app-investment-results',
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {

  protected investmentResults = computed<AnnualData[] | undefined>(() => this.investmentResultService.getResultData()());

  constructor(protected investmentResultService: InvestmentsService) {

  }

}
