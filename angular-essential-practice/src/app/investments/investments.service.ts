import {Injectable, signal} from "@angular/core";
import {InvestmentFormModel} from "./investment-form/investment-form.model";
import {AnnualData} from "./investment-results/investment-results.model";

@Injectable({
  providedIn: "root"
})
export class InvestmentsService {

  public resultData = signal<AnnualData[] | undefined>(undefined);

  public getResultData() {
    return this.resultData.asReadonly();
  }

  public calculateInvestmentResults = (values: InvestmentFormModel) => {
    const {initialInvestment, annualInvestment, expectedReturn, duration } = values;

    const annualData = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }

    this.resultData.set(annualData);
  }
}
