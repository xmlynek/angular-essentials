import {Injectable} from "@angular/core";
import {InvestmentFormModel} from "../investment-form/investment-form.model";

@Injectable({
  providedIn: "root"
})
export class InvestmentResultsService {

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

    return annualData;
  }
}
