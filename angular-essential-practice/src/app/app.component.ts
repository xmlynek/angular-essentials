import {Component} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {InvestmentFormComponent} from "./investments/investment-form/investment-form.component";
import {InvestmentResultsComponent} from "./investments/investment-results/investment-results.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, InvestmentFormComponent, InvestmentResultsComponent]
})
export class AppComponent {

}
