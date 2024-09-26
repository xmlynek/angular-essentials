import {Component, input, Input, signal} from '@angular/core';
import {AnnualData} from "./investment-results.model";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {

  public investmentResults = input.required<AnnualData[]>()


}
